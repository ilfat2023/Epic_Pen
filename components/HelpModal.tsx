
import React, { useState } from 'react';
import { X, Monitor, BookOpen, Terminal, Cpu, Globe, Github, PlayCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'GUIDE' | 'INSTALL' | 'DEV'>('GUIDE');

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
        <div className="flex border-b border-gray-700 bg-gray-900 overflow-x-auto">
          <button
            onClick={() => setActiveTab('GUIDE')}
            className={`flex-1 min-w-[120px] py-4 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'GUIDE' 
                ? 'text-primary-500 border-b-2 border-primary-500 bg-gray-800/50' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <BookOpen size={18} /> User Manual
          </button>
          <button
            onClick={() => setActiveTab('DEV')}
            className={`flex-1 min-w-[120px] py-4 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'DEV' 
                ? 'text-neon-blue border-b-2 border-neon-blue bg-gray-800/50' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Globe size={18} /> Developer & Web
          </button>
          <button
            onClick={() => setActiveTab('INSTALL')}
            className={`flex-1 min-w-[120px] py-4 font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'INSTALL' 
                ? 'text-neon-green border-b-2 border-neon-green bg-gray-800/50' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Monitor size={18} /> Create .EXE
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 text-gray-300 leading-relaxed">
          
          {activeTab === 'GUIDE' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-white mb-4">How to Use</h3>
                <ul className="space-y-4">
                  <li className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-primary-400 block mb-1">New Text Tool</strong>
                    Select the <strong>'T'</strong> icon. Click anywhere on the canvas to start typing. Press <strong>Enter</strong> to finish or Shift+Enter for a new line.
                  </li>
                  <li className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-neon-blue block mb-1">Background Modes (Glass/Whiteboard)</strong>
                    Click the <strong>BG</strong> button at the top left (next to the eye) to cycle modes:
                    <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
                      <li><strong>Glass:</strong> Transparent. Perfect for overlays.</li>
                      <li><strong>Dark:</strong> Standard dark mode space.</li>
                      <li><strong>Whiteboard:</strong> Bright white background.</li>
                      <li><strong>Grid:</strong> Mathematical grid on dark background.</li>
                    </ul>
                  </li>
                  <li className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-neon-pink block mb-1">Cursor Mode</strong>
                    Select the <strong>Cursor</strong> icon to stop drawing and interact with elements behind the canvas (only works in Overlay mode or if clicked through).
                  </li>
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'DEV' && (
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <PlayCircle size={20} /> Run Locally
                </h3>
                <p className="mb-4">To run this project on your own computer so you can modify the code:</p>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-green-400 border border-gray-700">
                  <span className="text-gray-500"># 1. Install Node.js (v16+)</span><br/>
                  <span className="text-gray-500"># 2. Open terminal in project folder</span><br/>
                  npm install<br/>
                  <br/>
                  <span className="text-gray-500"># 3. Start the development server</span><br/>
                  npm start
                </div>
                <p className="mt-2 text-sm text-gray-400">The app will open at <code>http://localhost:3000</code></p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Github size={20} /> Host on GitHub Pages
                </h3>
                <p className="mb-4">To put this app online for free:</p>
                <ol className="list-decimal list-inside space-y-3 text-sm">
                  <li>Create a new repository on GitHub.</li>
                  <li>Push your code to the repository.</li>
                  <li>
                    Open <code>package.json</code> and add your homepage:
                    <div className="bg-black p-2 rounded mt-1 font-mono text-xs text-yellow-400">
                      "homepage": "https://yourusername.github.io/repo-name"
                    </div>
                  </li>
                  <li>
                    Install the deployer:
                    <div className="bg-black p-2 rounded mt-1 font-mono text-xs text-green-400">
                      npm install gh-pages --save-dev
                    </div>
                  </li>
                  <li>
                    Add scripts to <code>package.json</code>:
                    <div className="bg-black p-2 rounded mt-1 font-mono text-xs text-gray-300">
                      "predeploy": "npm run build",<br/>
                      "deploy": "gh-pages -d build"
                    </div>
                  </li>
                  <li>Run <code>npm run deploy</code>. Done!</li>
                </ol>
              </section>
            </div>
          )}

          {activeTab === 'INSTALL' && (
            <div className="space-y-8">
               <div className="bg-blue-900/20 border border-blue-800 p-4 rounded-xl mb-6">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> This converts the web app into a native Windows .EXE that floats over your desktop (like Epic Pen).
                </p>
              </div>
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal size={20} /> Step 1: Setup Electron
                </h3>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-green-400 border border-gray-700">
                  mkdir lumina-desktop<br/>
                  cd lumina-desktop<br/>
                  npm init -y<br/>
                  npm install electron --save-dev
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu size={20} /> Step 2: create main.js
                </h3>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-gray-300 border border-gray-700 overflow-x-auto">
                  <span className="text-purple-400">const</span> {'{ app, BrowserWindow }'} = require('electron');<br/><br/>
                  <span className="text-purple-400">function</span> <span className="text-yellow-400">createWindow</span>() {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-purple-400">const</span> win = <span className="text-purple-400">new</span> BrowserWindow({'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;width: 800, height: 600,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;transparent: <span className="text-red-400">true</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;frame: <span className="text-red-400">false</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;alwaysOnTop: <span className="text-red-400">true</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;fullscreen: <span className="text-red-400">true</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;webPreferences: {'{ nodeIntegration: true }'}<br/>
                  &nbsp;&nbsp;{'}'});<br/>
                  &nbsp;&nbsp;win.loadURL('http://localhost:3000');<br/>
                  &nbsp;&nbsp;win.setIgnoreMouseEvents(<span className="text-red-400">true</span>, {'{ forward: true }'});<br/>
                  {'}'}<br/><br/>
                  app.whenReady().then(createWindow);
                </div>
              </section>
              <section>
                <h3 className="text-xl font-bold text-white mb-4">Step 3: Build</h3>
                <div className="bg-black p-4 rounded-lg font-mono text-xs text-green-400 border border-gray-700 mb-4">
                  npx electron-forge import<br/>
                  npm run make
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
