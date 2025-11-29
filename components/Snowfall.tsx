import React, { useMemo } from 'react';

export const Snowfall: React.FC = () => {
  // Create snowflakes with static properties to avoid re-renders causing jumps
  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100%
      animationDuration: 5 + Math.random() * 10, // 5-15s
      animationDelay: Math.random() * -15, // Negative delay to start mid-animation
      opacity: 0.3 + Math.random() * 0.7,
      size: 4 + Math.random() * 6, // 4-10px
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translateY(-20px) translateX(-10px);
            }
            50% {
              transform: translateY(50vh) translateX(10px);
            }
            100% {
              transform: translateY(105vh) translateX(-10px);
            }
          }
        `}
      </style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.animationDelay}s`,
            top: -20, // Start above screen
          }}
        />
      ))}
    </div>
  );
};