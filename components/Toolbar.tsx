import React from 'react';
import { 
  Pen, Highlighter, Eraser, Square, Circle, Minus, ArrowUpRight, Type, 
  Trash2, Download, Sparkles, Undo, Redo 
} from 'lucide-react';
import { ToolType } from '../types';

interface ToolbarProps {
  currentTool: ToolType;
  setTool: (t: ToolType) => void;
  onClear: () => void;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onAIToggle: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  setTool,
  onClear,
  onSave,
  onUndo,
  onRedo,
  onAIToggle,
  canUndo,
  canRedo
}) => {
  
  const tools = [
    { type: ToolType.PEN, icon: <Pen size={20} />, label: 'Pen' },
    { type: ToolType.HIGHLIGHTER, icon: <Highlighter size={20} />, label: 'Highlighter' },
    { type: ToolType.ERASER, icon: <Eraser size={20} />, label: 'Eraser' },
    { type: ToolType.ARROW, icon: <ArrowUpRight size={20} />, label: 'Arrow' },
    { type: ToolType.RECTANGLE, icon: <Square size={20} />, label: 'Rect' },
    { type: ToolType.CIRCLE, icon: <Circle size={20} />, label: 'Circle' },
    { type: ToolType.LINE, icon: <Minus size={20} />, label: 'Line' },
    // Text tool implementation is complex for a single-file component structure, often omitted in MVP 
    // but we keep the button for completeness of UI, maybe mapped to simple alert or overlay
    // { type: ToolType.TEXT, icon: <Type size={20} />, label: 'Text' },
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-gray-850/90 backdrop-blur-md border border-gray-700 rounded-2xl p-3 shadow-2xl flex flex-col gap-2 z-50">
      <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
        {tools.map((tool) => (
          <button
            key={tool.type}
            onClick={() => setTool(tool.type)}
            className={`p-3 rounded-xl transition-all duration-200 group relative ${
              currentTool === tool.type
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                : 'text-gray-400 hover:bg-gray-750 hover:text-white'
            }`}
            title={tool.label}
          >
            {tool.icon}
            <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {tool.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-3 rounded-xl transition-all ${
            !canUndo ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-750 hover:text-white'
          }`}
          title="Undo"
        >
          <Undo size={20} />
        </button>
        
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-3 rounded-xl transition-all ${
            !canRedo ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-750 hover:text-white'
          }`}
          title="Redo"
        >
          <Redo size={20} />
        </button>

        <div className="h-px bg-gray-700 my-1" />

        <button
          onClick={onAIToggle}
          className="p-3 rounded-xl text-neon-pink hover:bg-gray-750 hover:text-white transition-all animate-pulse hover:animate-none"
          title="Ask Gemini"
        >
          <Sparkles size={20} />
        </button>

        <button
          onClick={onClear}
          className="p-3 rounded-xl text-red-400 hover:bg-red-900/30 hover:text-red-200 transition-all"
          title="Clear Canvas"
        >
          <Trash2 size={20} />
        </button>

        <button
          onClick={onSave}
          className="p-3 rounded-xl text-neon-blue hover:bg-blue-900/30 hover:text-blue-200 transition-all"
          title="Save as PNG"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
