import React, { useState, useCallback, useRef, useEffect } from 'react';
import { COLORS, SHADOWS, BORDER_RADIUS, WIDGET, Z_INDEX, ANIMATION } from '../design-tokens';

const FloatingWidget = ({ 
  onSettingsClick, 
  onNotesClick, 
  isListening,
  position = { x: parseInt(WIDGET.POSITION.DEFAULT_LEFT), y: parseInt(WIDGET.POSITION.DEFAULT_TOP) },
  onPositionChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef(null);

  // Handle dragging functionality
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.menu-popup')) return; // Don't drag when clicking menu
    
    setIsDragging(true);
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
    
    // Keep widget within viewport bounds
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    newPosition.x = Math.max(0, Math.min(newPosition.x, viewport.width - parseInt(WIDGET.SIZE)));
    newPosition.y = Math.max(0, Math.min(newPosition.y, viewport.height - parseInt(WIDGET.SIZE)));
    
    onPositionChange?.(newPosition);
  }, [isDragging, dragOffset, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Toggle menu visibility
  const handleGlobeClick = useCallback(() => {
    if (isDragging) return; // Don't open menu if we were dragging
    setIsMenuOpen(prev => !prev);
  }, [isDragging]);

  // Auto-close menu after 4 seconds
  useEffect(() => {
    if (isMenuOpen) {
      const timer = setTimeout(() => {
        setIsMenuOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);

  // Handle menu button clicks
  const handleSettingsClick = useCallback(() => {
    onSettingsClick?.();
    setIsMenuOpen(false);
  }, [onSettingsClick]);

  const handleNotesClick = useCallback(() => {
    onNotesClick?.();
    setIsMenuOpen(false);
  }, [onNotesClick]);

  const widgetStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: Z_INDEX.WIDGET,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const globeButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDGET.SIZE,
    height: WIDGET.SIZE,
    borderRadius: BORDER_RADIUS.CIRCLE,
    background: isListening ? COLORS.GRADIENT_SUCCESS : COLORS.GRADIENT_PRIMARY,
    color: COLORS.TEXT_LIGHT,
    border: 'none',
    boxShadow: SHADOWS.WIDGET,
    fontSize: '24px',
    cursor: 'pointer',
    transition: `transform ${ANIMATION.DEFAULT}`,
    position: 'relative',
  };

  const menuPopupStyle = {
    position: 'absolute',
    top: WIDGET.MENU_OFFSET,
    left: '0',
    display: isMenuOpen ? 'flex' : 'none',
    gap: '8px',
    background: COLORS.BG_MENU,
    backdropFilter: 'blur(8px)',
    padding: '12px',
    borderRadius: BORDER_RADIUS.XXL,
    boxShadow: SHADOWS.LG,
  };

  const menuButtonStyle = {
    color: COLORS.TEXT_LIGHT,
    background: 'none',
    border: 'none',
    padding: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: `color ${ANIMATION.DEFAULT}`,
  };



  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .globe-button:hover {
            transform: scale(1.05);
          }
          .menu-button:hover {
            color: #60a5fa !important;
          }
        `}
      </style>
      <div ref={widgetRef} style={widgetStyle} className="floating-widget">
        {/* Main Globe Button */}
        <button 
          className="globe-button"
          style={globeButtonStyle}
          onMouseDown={handleMouseDown}
          onClick={handleGlobeClick}
        >
          🌍
          {/* Red dot indicator for listening state */}
          {isListening && <div className="red-dot" />}
        </button>

        {/* Menu Popup */}
        <div className="menu-popup" style={menuPopupStyle}>
          <button 
            className="menu-button"
            style={menuButtonStyle}
            onClick={handleSettingsClick}
            title="Output Language Settings"
          >
            ⚙️
          </button>
          <button 
            className="menu-button"
            style={menuButtonStyle}
            onClick={handleNotesClick}
            title="Meeting Notes"
          >
            📝
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingWidget;