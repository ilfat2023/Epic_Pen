import React from 'react';
import { COLORS } from '../constants';

interface PropertiesBarProps {
  color: string;
  setColor: (c: string) => void;
  width: number;
  setWidth: (w: number) => void;
}

const PropertiesBar: React.FC<PropertiesBarProps> = ({
  color,
  setColor,
  width,
  setWidth
}) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-850/90 backdrop-blur-md border border-gray-700 rounded-full px-6 py-3 shadow-xl flex items-center gap-6 z-50">
      
      {/* Color Picker */}
      <div className="flex items-center gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
              color === c ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
        <label className="relative w-8 h-8 ml-2 cursor-pointer group">
           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-blue-600 border-2 border-gray-600 group-hover:border-white" />
           <input 
             type="color" 
             value={color}
             onChange={(e) => setColor(e.target.value)}
             className="opacity-0 w-full h-full cursor-pointer"
           />
        </label>
      </div>

      <div className="w-px h-8 bg-gray-700" />

      {/* Size Slider */}
      <div className="flex items-center gap-3">
        <div 
          className="rounded-full bg-white transition-all"
          style={{ width: 4, height: 4, backgroundColor: color }}
        />
        <input
          type="range"
          min="1"
          max="50"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
          className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500 hover:accent-primary-400"
        />
        <div 
          className="rounded-full bg-white transition-all"
          style={{ width: 24, height: 24, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default PropertiesBar;
