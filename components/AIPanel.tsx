import React, { useState } from 'react';
import { X, Send, Image as ImageIcon, Eye, Loader2, Wand2 } from 'lucide-react';
import { AITask } from '../types';

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (prompt: string) => void;
  onGenerate: (prompt: string) => void;
  loading: boolean;
  result: string | null;
  error: string | null;
}

const AIPanel: React.FC<AIPanelProps> = ({
  isOpen,
  onClose,
  onAnalyze,
  onGenerate,
  loading,
  result,
  error
}) => {
  const [activeTab, setActiveTab] = useState<'ANALYZE' | 'GENERATE'>('ANALYZE');
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    if (activeTab === 'ANALYZE') {
      onAnalyze(prompt);
    } else {
      onGenerate(prompt);
    }
  };

  return (
    <div className="fixed right-6 top-6 bottom-6 w-96 bg-gray-850 border border-gray-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gradient-to-r from-gray-850 to-gray-800">
        <div className="flex items-center gap-2">
          <SparkleIcon className="text-neon-pink" />
          <h2 className="font-bold text-lg text-white">Gemini Assistant</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('ANALYZE')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'ANALYZE' 
              ? 'bg-gray-800 text-neon-blue border-b-2 border-neon-blue' 
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          <Eye size={16} /> Analyze Canvas
        </button>
        <button
          onClick={() => setActiveTab('GENERATE')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'GENERATE' 
              ? 'bg-gray-800 text-neon-pink border-b-2 border-neon-pink' 
              : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          <ImageIcon size={16} /> Generate BG
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-200 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && !loading && (
           <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
             <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Result</h3>
             <div className="prose prose-invert text-sm leading-relaxed whitespace-pre-wrap">
                {result}
             </div>
           </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
            <Loader2 size={32} className="animate-spin text-primary-500" />
            <span className="text-sm animate-pulse">Gemini is thinking...</span>
          </div>
        )}
        
        {!loading && !result && (
          <div className="text-center py-12 text-gray-600">
            {activeTab === 'ANALYZE' ? (
              <>
                <Eye size={48} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">Ask Gemini to explain, summarize, or critique your drawing.</p>
              </>
            ) : (
              <>
                <Wand2 size={48} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">Generate a background image to trace over or annotate.</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={activeTab === 'ANALYZE' ? "What does this drawing look like?" : "A futuristic city blueprint..."}
            className="w-full bg-gray-800 text-white pl-4 pr-12 py-3 rounded-xl border border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
      </form>
    </div>
  );
};

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

export default AIPanel;
