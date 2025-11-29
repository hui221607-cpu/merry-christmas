import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Square, Trash2 } from 'lucide-react';
import { ORIGINAL_TIPS, BG_COLORS, WINDOW_SIZE } from './constants';
import { TipWindowData } from './types';
import { TipWindow } from './components/TipWindow';
import { Snowfall } from './components/Snowfall';
import { ChristmasDuck } from './components/ChristmasDuck';

const MAX_WINDOWS = 100;
const SPAWN_INTERVAL = 500; // 500ms = 2 per second

const App: React.FC = () => {
  const [windows, setWindows] = useState<TipWindowData[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  // Check for auto-start parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('start') === '1') {
      setIsRunning(true);
    }
  }, []);

  // Helper to generate a random window
  const createRandomWindow = useCallback((): TipWindowData => {
    const maxX = window.innerWidth - WINDOW_SIZE.width;
    const maxY = window.innerHeight - WINDOW_SIZE.height;

    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
      text: ORIGINAL_TIPS[Math.floor(Math.random() * ORIGINAL_TIPS.length)],
      color: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
      rotation: Math.random() * 6 - 3, // Slight tilt for realism
    };
  }, []);

  // Main loop logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setWindows((prev) => {
          if (prev.length >= MAX_WINDOWS) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRunning(false);
            return prev;
          }
          return [...prev, createRandomWindow()];
        });
      }, SPAWN_INTERVAL);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, createRandomWindow]);

  const handleStart = () => {
    setIsRunning(true);
  };
  
  const handleStop = () => setIsRunning(false);
  
  const handleClear = () => {
    setIsRunning(false);
    setWindows([]);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden font-sans bg-black"
    >
      <Snowfall />
      
      {/* Background Content - Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 pb-10">
        <ChristmasDuck />
        <h1 className="text-white text-6xl md:text-8xl font-bold tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center px-4 mt-4">
          Merry Christmas
        </h1>
      </div>

      {/* Render Windows */}
      {windows.map((win) => (
        <TipWindow key={win.id} data={win} dimensions={WINDOW_SIZE} />
      ))}

      {/* Control Panel (Sticky Bottom) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-4 flex items-center gap-4 z-[100] transition-all hover:scale-105">
        
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Controls</span>
          <div className="flex gap-2">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <Play size={18} /> Start
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
              >
                <Square size={18} fill="currentColor" /> Pause
              </button>
            )}
            
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              disabled={windows.length === 0}
            >
              <Trash2 size={18} /> Clear ({windows.length})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;