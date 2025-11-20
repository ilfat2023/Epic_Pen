import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ToolType, DrawStyle } from '../types';

interface CanvasLayerProps {
  tool: ToolType;
  style: DrawStyle;
  backgroundImage: string | null; // Data URL
  onSnapshotUpdate: (dataUrl: string) => void; // For history
  historyIndex: number;
  historyStack: string[];
}

const CanvasLayer: React.FC<CanvasLayerProps> = ({
  tool,
  style,
  backgroundImage,
  onSnapshotUpdate,
  historyIndex,
  historyStack
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null); // For previewing shapes
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Initialize and Resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current || !tempCanvasRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Save current content
      const prevContent = canvasRef.current.toDataURL();

      // Resize
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      tempCanvasRef.current.width = width;
      tempCanvasRef.current.height = height;

      // Restore content
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = prevContent;
        img.onload = () => ctx.drawImage(img, 0, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle History Changes (Undo/Redo)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || historyStack.length === 0) return;

    const currentSnapshot = historyStack[historyIndex];
    if (currentSnapshot) {
      const img = new Image();
      img.src = currentSnapshot;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    } else if (historyIndex === -1) {
        // Clear if at start
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [historyIndex, historyStack]);

  // Drawing Logic Helpers
  const getMousePos = (e: React.MouseEvent | MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    if (tool === ToolType.CURSOR) return;
    
    const { x, y } = getMousePos(e);
    setStartPos({ x, y });
    setIsDrawing(true);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Setup Styles
    ctx.lineWidth = style.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = style.color;
    ctx.globalAlpha = tool === ToolType.HIGHLIGHTER ? 0.4 : 1.0;
    
    if (tool === ToolType.ERASER) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || tool === ToolType.CURSOR) return;
    
    const { x, y } = getMousePos(e);
    const ctx = canvasRef.current?.getContext('2d');
    const tempCtx = tempCanvasRef.current?.getContext('2d');
    
    if (!ctx || !tempCtx || !tempCanvasRef.current || !canvasRef.current) return;

    // For freehand tools, draw directly on main canvas
    if (tool === ToolType.PEN || tool === ToolType.HIGHLIGHTER || tool === ToolType.ERASER) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // For shapes, clear temp canvas and draw shape preview
      tempCtx.clearRect(0, 0, tempCanvasRef.current.width, tempCanvasRef.current.height);
      tempCtx.beginPath();
      tempCtx.lineWidth = style.width;
      tempCtx.strokeStyle = style.color;
      tempCtx.lineCap = 'round';
      tempCtx.globalAlpha = 1.0;

      if (tool === ToolType.RECTANGLE) {
        tempCtx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (tool === ToolType.CIRCLE) {
         const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
         tempCtx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      } else if (tool === ToolType.LINE) {
        tempCtx.moveTo(startPos.x, startPos.y);
        tempCtx.lineTo(x, y);
      } else if (tool === ToolType.ARROW) {
        drawArrow(tempCtx, startPos.x, startPos.y, x, y);
      }
      
      tempCtx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const ctx = canvasRef.current?.getContext('2d');
    const tempCanvas = tempCanvasRef.current;
    
    if (ctx && tempCanvas) {
      // If it was a shape tool, commit the temp canvas to the main canvas
      if ([ToolType.RECTANGLE, ToolType.CIRCLE, ToolType.LINE, ToolType.ARROW].includes(tool)) {
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(tempCanvas, 0, 0);
        // Clear temp
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx?.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      }
      
      ctx.closePath();
      // Save state for history
      if (canvasRef.current) {
        onSnapshotUpdate(canvasRef.current.toDataURL());
      }
    }
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, fromx: number, fromy: number, tox: number, toy: number) => {
    const headlen = 10 * (style.width / 4 + 0.5); // scaling head with width
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  };

  // "Epic Pen" click-through logic:
  // If tool is CURSOR, we use pointer-events-none to let mouse events pass through to elements behind
  // (or just stop interacting with canvas)
  const layerClass = tool === ToolType.CURSOR 
    ? "absolute inset-0 z-10 touch-none pointer-events-none" 
    : "absolute inset-0 z-10 touch-none cursor-crosshair";

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-transparent">
      {/* Background Image Layer */}
      {backgroundImage && (
        <div 
           className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat opacity-100 pointer-events-none"
           style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Main Drawing Canvas */}
      <canvas
        ref={canvasRef}
        className={layerClass}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      {/* Temporary Shape Preview Canvas - Click through always, as it's for visual feedback only */}
      <canvas
        ref={tempCanvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
      />
    </div>
  );
};

export default CanvasLayer;