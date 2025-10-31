import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, FileText } from 'lucide-react';

// ✅ Browser speech recognizer helper
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function GoglobalWidget({ setActiveFeature, isListening = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  useEffect(() => {
    // Load saved position from localStorage
    const savedPosition = localStorage.getItem('widgetPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.menu-button')) return;
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !dragRef.current) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      const newPos = {
        x: dragRef.current.startPosX + deltaX,
        y: dragRef.current.startPosY + deltaY,
      };

      setPosition(newPos);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        localStorage.setItem('widgetPosition', JSON.stringify(position));
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const handleGlobeClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      // Auto-close after 4 seconds
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 4000);
    }
  };

  const handleMenuButtonClick = (action) => {
    setIsMenuOpen(false);
    if (action === 'settings') {
      setActiveFeature('voice');
    } else {
      setActiveFeature('note');
    }
  };

  return (
    <div
      style={{ 
        position: 'fixed', 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Menu Popup */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Settings Button - Top Left */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x: -60, y: -60 }}
              exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMenuButtonClick('settings')}
              className="menu-button absolute top-0 left-0 w-12 h-12 rounded-full bg-blue-500 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* Transcript Button - Top Right */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x: 60, y: -60 }}
              exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMenuButtonClick('notes')}
              className="menu-button absolute top-0 left-0 w-12 h-12 rounded-full bg-blue-500 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all"
              title="Transcript"
            >
              <FileText className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Globe Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGlobeClick}
        className={`relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-2xl transition-all ${
          isListening 
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-400' 
            : 'bg-gradient-to-br from-blue-500 to-blue-400'
        }`}
      >
        🌍
        
        {/* Red Dot Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"
            >
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-red-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}