
import React, { useState } from 'react';
import { 
  Pen, Highlighter, Eraser, Square, Circle, Minus, ArrowUpRight, 
  Trash2, Download, Sparkles, Undo, Redo, MousePointer2, Eye, EyeOff, Menu, HelpCircle
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
  onToggleUI: () => void;
  onOpenHelp: () => void;
  isUIHidden: boolean;
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
  onToggleUI,
  onOpenHelp,
  isUIHidden,
  canUndo,
  canRedo
}) => {
  
  const tools = [
    { type: ToolType.CURSOR, icon: <MousePointer2 size={20} />, label: 'Cursor' },
    { type: ToolType.PEN, icon: <Pen size={20} />, label: 'Pen' },
    { type: ToolType.HIGHLIGHTER, icon: <Highlighter size={20} />, label: 'Highlighter' },
    { type: ToolType.ERASER, icon: <Eraser size={20} />, label: 'Eraser' },
    { type: ToolType.ARROW, icon: <ArrowUpRight size={20} />, label: 'Arrow' },
    { type: ToolType.RECTANGLE, icon: <Square size={20} />, label: 'Rect' },
    { type: ToolType.CIRCLE, icon: <Circle size={20} />, label: 'Circle' },
    { type: ToolType.LINE, icon: <Minus size={20} />, label: 'Line' },
  ];

  // Minimized View (Eye Only)
  if (isUIHidden) {
    return (
      <div className="fixed left-4 top-4 z-50">
        <button
          onClick={onToggleUI}
          className="p-3 rounded-full bg-gray-850/50 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all shadow-lg"
          title="Show Toolbar"
        >
          <Eye size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
      {/* Visibility Toggle Floating Above */}
      <div className="self-start mb-2 flex gap-2">
        <button
           onClick={onToggleUI}
           className="p-2 rounded-full bg-gray-850/90 backdrop-blur-md border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-750 transition-all"
           title="Hide Interface"
        >
          <EyeOff size={16} />
        </button>
      </div>

      <div className="bg-gray-850/90 backdrop-blur-md border border-gray-700 rounded-2xl p-3 shadow-2xl flex flex-col gap-2">
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
              <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {tool.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <div className="flex gap-1 justify-between">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`flex-1 p-2 rounded-xl transition-all flex justify-center ${
                !canUndo ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-750 hover:text-white'
              }`}
              title="Undo"
            >
              <Undo size={18} />
            </button>
            
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`flex-1 p-2 rounded-xl transition-all flex justify-center ${
                !canRedo ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-750 hover:text-white'
              }`}
              title="Redo"
            >
              <Redo size={18} />
            </button>
          </div>

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

          <button
            onClick={onOpenHelp}
            className="p-3 rounded-xl text-neon-green hover:bg-green-900/30 hover:text-green-200 transition-all"
            title="Help & Install"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
