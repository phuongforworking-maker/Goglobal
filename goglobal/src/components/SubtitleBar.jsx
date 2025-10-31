import React from 'react';

/**
 * SubtitleBar component displays live subtitles at the bottom of the screen.
 * Parent controls visibility; this component renders when mounted.
 * @param {string} translatedText - The subtitle text to display
 * @param {string} targetLangCode - Target language code (optional for future styling)
 */
const SubtitleBar = ({ translatedText, targetLangCode }) => {
  if (!translatedText) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '16px 24px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: '500',
      zIndex: 1000,
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
    }}>
      {translatedText}
    </div>
  );
};

export default SubtitleBar;
