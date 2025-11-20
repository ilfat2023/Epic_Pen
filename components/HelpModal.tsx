
import React, { useState } from 'react';
import { X, Monitor, BookOpen, Terminal, Cpu } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'GUIDE' | 'INSTALL'>('GUIDE');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-850">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-primary-500" />
            Lumina Draw Guide
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-900">
          <button
            onClick={() => setActiveTab('GUIDE')}
            className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'GUIDE' 
                ? 'text-primary-500 border-b-2 border-primary-500 bg-gray-800/50' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <BookOpen size={18} /> User Manual
          </button>
          <button
            onClick={() => setActiveTab('INSTALL')}
            className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'INSTALL' 
                ? 'text-neon-green border-b-2 border-neon-green bg-gray-800/50' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Monitor size={18} /> Create Windows .EXE
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 text-gray-300 leading-relaxed">
          
          {activeTab === 'GUIDE' ? (
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-white mb-4">How to Work</h3>
                <ul className="space-y-4">
                  <li className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-primary-400 block mb-1">Drawing & Tools</strong>
                    Select tools like Pen, Highlighter, or Shapes from the floating toolbar. Adjust color and size using the top bar.
                  </li>
                  <li className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-neon-blue block mb-1">Cursor Mode (Important!)</strong>
                    Select the <strong>Cursor (Mouse)</strong> icon to interact with the screen behind the drawing. In this mode, drawing is disabled so you can click links or use other apps if this is running as an overlay.
                  </li>
                  <li className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-neon-pink block mb-1">Gemini AI</strong>
                    Click the <strong>Sparkles</strong> icon to open the AI panel. You can ask Gemini to analyze your current drawing ("What did I draw?") or generate background images ("Blueprint of a engine") to trace over.
                  </li>
                  <li className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-white block mb-1">Stealth Mode</strong>
                    Click the <strong>Eye Off</strong> icon above the toolbar to hide all interfaces. Only a small eye icon will remain. This is perfect for recording tutorials or presenting.
                  </li>
                </ul>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-blue-900/20 border border-blue-800 p-4 rounded-xl mb-6">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> This is currently a Web Application. To make it function exactly like Epic Pen (drawing over your Windows Desktop), you must wrap it with <strong>Electron</strong>.
                </p>
              </div>

              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal size={20} /> Step 1: Setup Electron
                </h3>
                <p className="mb-4">Create a folder for your desktop app and initialize it:</p>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-green-400 border border-gray-700">
                  mkdir lumina-desktop<br/>
                  cd lumina-desktop<br/>
                  npm init -y<br/>
                  npm install electron --save-dev
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu size={20} /> Step 2: Create main.js
                </h3>
                <p className="mb-4">Create a file named <code>main.js</code>. This configuration makes the window transparent and always on top.</p>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-gray-300 border border-gray-700 overflow-x-auto">
                  <span className="text-purple-400">const</span> {'{ app, BrowserWindow }'} = require('electron');<br/><br/>
                  <span className="text-purple-400">function</span> <span className="text-yellow-400">createWindow</span>() {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-purple-400">const</span> win = <span className="text-purple-400">new</span> BrowserWindow({'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;width: 800, height: 600,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;transparent: <span className="text-red-400">true</span>, <span className="text-gray-500">// Key for overlay</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;frame: <span className="text-red-400">false</span>,       <span className="text-gray-500">// Removes window border</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;alwaysOnTop: <span className="text-red-400">true</span>, <span className="text-gray-500">// Floating effect</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;fullscreen: <span className="text-red-400">true</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;webPreferences: {'{ nodeIntegration: true }'}<br/>
                  &nbsp;&nbsp;{'}'});<br/>
                  &nbsp;&nbsp;win.loadURL('http://localhost:3000'); <span className="text-gray-500">// Or load file:// build/index.html</span><br/>
                  &nbsp;&nbsp;win.setIgnoreMouseEvents(<span className="text-red-400">true</span>, {'{ forward: true }'}); <span className="text-gray-500">// Pass-through clicks logic needs implementation</span><br/>
                  {'}'}<br/><br/>
                  app.whenReady().then(createWindow);
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Step 3: Build EXE</h3>
                <p className="mb-4">Use <strong>Electron Forge</strong> to bundle it into an installer.</p>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-green-400 border border-gray-700 mb-4">
                  npx electron-forge import<br/>
                  npm run make
                </div>
                <p className="text-sm text-gray-400">
                  This will generate a <code>out/make</code> folder containing your <code>setup.exe</code>.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
