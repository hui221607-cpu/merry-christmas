import React from 'react';
import { Heart, Minus, Square, X } from 'lucide-react';
import { TipWindowData, WindowDimensions } from '../types';

interface TipWindowProps {
  data: TipWindowData;
  dimensions: WindowDimensions;
}

export const TipWindow: React.FC<TipWindowProps> = ({ data, dimensions }) => {
  return (
    <div
      className="absolute flex flex-col shadow-2xl rounded-xl overflow-hidden select-none transition-opacity duration-500 animate-in fade-in zoom-in-95"
      style={{
        left: data.x,
        top: data.y,
        width: dimensions.width,
        height: dimensions.height,
        zIndex: 50,
        transform: `rotate(${data.rotation}deg)`,
        // Adding a subtle border to make it pop against the black background
        border: '1px solid rgba(255, 255, 255, 0.3)' 
      }}
    >
      {/* Title Bar */}
      <div className="h-9 bg-white flex items-center justify-between px-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          <span className="text-gray-400 text-sm font-medium tracking-wide">鸭鸭</span>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-3 text-gray-300">
          <Minus className="w-3 h-3 hover:text-gray-500 transition-colors" strokeWidth={3} />
          <Square className="w-2.5 h-2.5 hover:text-gray-500 transition-colors" strokeWidth={3} />
          <X className="w-3 h-3 hover:text-gray-500 transition-colors" strokeWidth={3} />
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="flex-1 flex items-center justify-center p-5 relative"
        style={{ backgroundColor: data.color }}
      >
        <span className="font-sans text-gray-800 font-medium text-base leading-relaxed whitespace-pre-wrap text-center drop-shadow-sm">
          {data.text}
        </span>
      </div>
    </div>
  );
};