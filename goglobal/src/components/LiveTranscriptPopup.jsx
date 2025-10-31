import React from 'react';
import { COLORS, SHADOWS, BORDER_RADIUS, WIDGET, Z_INDEX, TYPOGRAPHY, SPACING } from '../design-tokens';

const LiveTranscriptPopup = ({ 
  isVisible,
  currentTranscript,
  targetLangCode,
  setTargetLangCode,
  availableLanguages,
  isListening = false
}) => {
  if (!isVisible) return null;

  const popupStyle = {
    position: 'fixed',
    bottom: '96px',
    right: SPACING.XXL,
    background: COLORS.BG_GLASS,
    backdropFilter: 'blur(12px)',
    color: COLORS.TEXT_LIGHT,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.XXL,
    boxShadow: SHADOWS.TRANSCRIPT,
    maxWidth: WIDGET.TRANSCRIPT_WIDTH,
    width: WIDGET.TRANSCRIPT_WIDTH,
    fontSize: TYPOGRAPHY.SIZES.SM,
    maxHeight: WIDGET.TRANSCRIPT_MAX_HEIGHT,
    overflowY: 'auto',
    zIndex: Z_INDEX.MODAL,
  };

  const headerStyle = {
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
    marginBottom: SPACING.SM,
    color: '#93c5fd',
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const pulseDotStyle = {
    width: '8px',
    height: '8px',
    background: COLORS.SUCCESS,
    borderRadius: BORDER_RADIUS.CIRCLE,
    animation: isListening ? 'pulse 2s infinite' : 'none',
  };

  const transcriptStyle = {
    whiteSpace: 'pre-wrap',
    minHeight: '32px',
    color: '#f3f4f6',
    margin: `0 0 ${SPACING.MD} 0`,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    lineHeight: TYPOGRAPHY.LINE_HEIGHTS.RELAXED,
  };

  const controlsStyle = {
    marginTop: SPACING.MD,
    paddingTop: SPACING.SM,
    borderTop: `1px solid #4b5563`,
  };

  const labelStyle = {
    color: '#9ca3af',
    fontSize: TYPOGRAPHY.SIZES.XS,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const selectStyle = {
    marginLeft: SPACING.SM,
    background: '#374151',
    color: COLORS.TEXT_LIGHT,
    borderRadius: BORDER_RADIUS.SM,
    padding: `${SPACING.XS} ${SPACING.SM}`,
    fontSize: TYPOGRAPHY.SIZES.XS,
    border: '1px solid #4b5563',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const helpTextStyle = {
    marginTop: SPACING.SM,
    fontSize: TYPOGRAPHY.SIZES.XS,
    color: '#9ca3af',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  // Get language flag emoji
  const getLanguageFlag = (langCode) => {
    const flagMap = {
      'en': '🇺🇸',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'zh': '🇨🇳',
      'ko': '🇰🇷',
      'ja': '🇯🇵',
      'vi': '🇻🇳',
    };
    return flagMap[langCode] || '🌍';
  };

  const displayTranscript = currentTranscript || (isListening 
    ? '🎤 Listening for speech in any language...' 
    : '🎤 Click the notes button to start listening...'
  );

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
      <div style={popupStyle}>
        {/* Header with status indicator */}
        <div style={headerStyle}>
          <div style={pulseDotStyle} />
          Live Translation
        </div>

        {/* Transcript display */}
        <p style={transcriptStyle}>
          {displayTranscript}
        </p>

        {/* Language selection controls */}
        <div style={controlsStyle}>
          <label style={labelStyle}>Translate to:</label>
          <select 
            style={selectStyle}
            value={targetLangCode}
            onChange={(e) => setTargetLangCode(e.target.value)}
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {getLanguageFlag(lang.code)} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Help text */}
        <div style={helpTextStyle}>
          Supports mixed language speech detection
        </div>
      </div>
    </>
  );
};

export default LiveTranscriptPopup;