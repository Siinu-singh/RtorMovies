
"use client";

import React from 'react';
import { Menu } from 'lucide-react';

// SVG Icon for Triangle
const TriangleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 22h20L12 2z"></path>
  </svg>
);

// SVG Icon for Square
const SquareIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3 3h18v18H3V3z"></path>
  </svg>
);

// SVG Icon for Cross (X)
const CrossIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


export default function BottomControlsPS5({ controls }) {
  if (!controls || controls.length === 0) {
    // Default controls if none are provided, matching the new request style
    controls = [
      { icon: <Menu className="w-5 h-5" />, label: 'Options' },
      { icon: <TriangleIcon className="w-4 h-4" />, label: 'Top Menu' },
      { icon: <SquareIcon className="w-4 h-4" />, label: 'Details' },
      { icon: <CrossIcon className="w-4 h-4" />, label: 'Play' },
    ];
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4">
      <div className="container mx-auto flex items-center justify-center space-x-6 text-xs text-gray-300">
        {controls.map((control, index) => (
          <div key={index} className="flex items-center space-x-1.5">
            <span className="flex items-center justify-center p-1 border border-gray-500 rounded-full w-6 h-6">
              {React.cloneElement(control.icon, { className: `${control.icon.props.className || 'w-3 h-3'} text-gray-200` })}
            </span>
            <span>{control.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
