
import React, { useState, useEffect, useCallback } from 'react';
import CanvasLayer from './components/CanvasLayer';
import Toolbar from './components/Toolbar';
import PropertiesBar from './components/PropertiesBar';
import AIPanel from './components/AIPanel';
import HelpModal from './components/HelpModal';
import { ToolType, DrawStyle } from './types';
import { DEFAULT_STROKE_WIDTH, COLORS } from './constants';
import { analyzeDrawing, generateBackgroundImage } from './services/geminiService';

function App() {
  // -- State --
  const [tool, setTool] = useState<ToolType>(ToolType.PEN);
  const [style, setStyle] = useState<DrawStyle>({
    color: COLORS[4], // Blue default
    width: DEFAULT_STROKE_WIDTH,
    opacity: 1,
  });
  
  // Canvas History
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Background
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  // UI State
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isUIHidden, setIsUIHidden] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // -- Actions --

  const handleSnapshotUpdate = (dataUrl: string) => {
    const newHistory = historyStack.slice(0, historyIndex + 1);
    newHistory.push(dataUrl);
    setHistoryStack(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    } else if (historyIndex === 0) {
       setHistoryIndex(-1); // Clear
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleClear = () => {
    setHistoryStack([]);
    setHistoryIndex(-1);
    setBackgroundImage(null);
  };

  const handleSave = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `lumina-draw-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setBackgroundImage(event.target.result as string);
            }
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  // -- AI Handlers --

  const handleAIAnalyze = async (prompt: string) => {
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) throw new Error("Canvas not found");
      
      const base64 = canvas.toDataURL('image/png');
      const result = await analyzeDrawing(base64, prompt);
      setAiResult(result);
    } catch (err: any) {
      setAiError(err.message || "Analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAIGenerate = async (prompt: string) => {
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    
    try {
      const base64Image = await generateBackgroundImage(prompt);
      setBackgroundImage(base64Image);
      setAiResult("Background generated and applied to canvas!");
    } catch (err: any) {
      setAiError(err.message || "Generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    // Changed background to transparent/dark-overlay style
    <div className={`relative w-screen h-screen overflow-hidden text-white font-sans ${backgroundImage ? 'bg-gray-900/50' : 'bg-gray-900'}`}>
      
      {/* Canvas Area */}
      <CanvasLayer 
        tool={tool}
        style={style}
        backgroundImage={backgroundImage}
        onSnapshotUpdate={handleSnapshotUpdate}
        historyIndex={historyIndex}
        historyStack={historyStack}
      />

      {/* UI Overlays */}
      <Toolbar 
        currentTool={tool}
        setTool={setTool}
        onClear={handleClear}
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onAIToggle={() => setIsAIPanelOpen(!isAIPanelOpen)}
        onToggleUI={() => setIsUIHidden(!isUIHidden)}
        onOpenHelp={() => setIsHelpOpen(true)}
        isUIHidden={isUIHidden}
        canUndo={historyIndex >= -1 && historyStack.length > 0}
        canRedo={historyIndex < historyStack.length - 1}
      />

      {!isUIHidden && (
        <PropertiesBar 
          color={style.color}
          setColor={(c) => setStyle(prev => ({ ...prev, color: c }))}
          width={style.width}
          setWidth={(w) => setStyle(prev => ({ ...prev, width: w }))}
        />
      )}

      <AIPanel 
        isOpen={isAIPanelOpen && !isUIHidden}
        onClose={() => setIsAIPanelOpen(false)}
        onAnalyze={handleAIAnalyze}
        onGenerate={handleAIGenerate}
        loading={aiLoading}
        result={aiResult}
        error={aiError}
      />
      
      <HelpModal 
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Hint overlay for new users - hidden when drawing or UI hidden */}
      {historyStack.length === 0 && !backgroundImage && !isAIPanelOpen && !isUIHidden && !isHelpOpen && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm pointer-events-none select-none animate-pulse">
          Start drawing, paste (Ctrl+V) an image, or click ? for help
        </div>
      )}
    </div>
  );
}

export default App;
