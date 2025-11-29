import React from 'react';

export const ChristmasDuck: React.FC = () => {
  return (
    <div className="animate-bounce duration-[2000ms]">
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges" // This ensures the pixels stay sharp (8-bit style)
        className="drop-shadow-lg"
      >
        {/* --- Santa Hat --- */}
        {/* White Pompom (Tip) */}
        <rect x="15" y="2" width="2" height="2" fill="white" />
        
        {/* Red Hat Body */}
        <path d="M12 4H15V6H12V4Z" fill="#EF4444" /> {/* Top part */}
        <path d="M11 6H16V8H11V6Z" fill="#EF4444" /> {/* Middle part */}
        
        {/* White Hat Brim */}
        <rect x="10" y="8" width="8" height="2" fill="white" />

        {/* --- Duck Head --- */}
        {/* Yellow Head */}
        <rect x="11" y="10" width="5" height="4" fill="#FACC15" />
        
        {/* Eye (Black) */}
        <rect x="14" y="11" width="1" height="1" fill="black" />
        
        {/* Blush (Pink) */}
        <rect x="12" y="12" width="1" height="1" fill="#F472B6" opacity="0.6" />

        {/* Beak (Orange) */}
        <rect x="16" y="11" width="2" height="2" fill="#F97316" />

        {/* --- Duck Body --- */}
        {/* Main Body */}
        <path d="M9 14H16V19H9V14Z" fill="#FACC15" />
        {/* Tail sticking up */}
        <rect x="8" y="13" width="1" height="2" fill="#FACC15" />
        
        {/* Wing (Darker Yellow) */}
        <rect x="11" y="16" width="3" height="2" fill="#EAB308" />
        
        {/* Feet (Orange) */}
        <rect x="11" y="19" width="1" height="1" fill="#F97316" />
        <rect x="13" y="19" width="1" height="1" fill="#F97316" />
      </svg>
    </div>
  );
};