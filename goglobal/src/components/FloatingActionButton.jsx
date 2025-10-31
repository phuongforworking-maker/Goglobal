import React, { useState, useEffect, useRef } from 'react';

// Define unique brand colors 
const COLORS = {
    PRIMARY: '#007bff', // Blue
    ACCENT: '#ff9800', // Orange
    TEXT_LIGHT: '#ffffff',
    TEXT_DARK: '#333333',
    SHADOW: '0 4px 12px rgba(0,0,0,0.4)',
    SHADOW_DRAG: '0 8px 24px rgba(0,0,0,0.6)',
};

const FloatingActionButton = ({ setActiveFeature, isActive = false }) => {
  const buttonRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Default position

  // Load last saved position
  useEffect(() => {
    const savedPos = localStorage.getItem("fab-position");
    if (savedPos) setPosition(JSON.parse(savedPos));
  }, []);

  // Save position when moved
  useEffect(() => {
    localStorage.setItem("fab-position", JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = position.x;
    const initialY = position.y;

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setPosition({ x: initialX + dx, y: initialY + dy });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 50,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        transition: isDragging ? "none" : "transform 0.1s ease-out",
      }}
    >
      <div
        className="rounded-full shadow-lg flex flex-col space-y-2 p-3 relative"
        style={{
          backgroundColor: isActive ? COLORS.PRIMARY : '#4a5568',
          boxShadow: isDragging ? COLORS.SHADOW_DRAG : COLORS.SHADOW,
        }}
      >
        {/* Active Indicator - Small Red Dot */}
        {isActive && (
          <div 
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
            style={{ 
              backgroundColor: '#ff4444',
              boxShadow: '0 0 8px rgba(255, 68, 68, 0.6)',
              border: '2px solid white'
            }}
            title="Active - Ready to translate"
          />
        )}

        {/* Settings Button */}
        <button
          onClick={() => setActiveFeature("voice")}
          className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-700 shadow transition"
          title="Output Language Settings"
        >
          <i className="fa fa-cog"></i>
        </button>

        {/* Note/Meeting Button */}
        <button
          onClick={() => setActiveFeature("note")}
          className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-700 shadow transition"
          title="Meeting Notes"
        >
          <i className="fa fa-book"></i>
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;
