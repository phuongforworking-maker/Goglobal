import React, { useState, useCallback } from 'react';
import { COLORS, SHADOWS, BORDER_RADIUS, WIDGET, Z_INDEX, TYPOGRAPHY, SPACING, ANIMATION } from '../design-tokens';

const ModernNotesPanel = ({ 
  isOpen,
  onClose,
  transcript,
  isRecording,
  onStartRecording,
  onStopRecording,
  onGenerateSummary,
  meetingSummary,
  targetLangCode,
  availableLanguages
}) => {
  if (!isOpen) return null;

  const [localTranscript, setLocalTranscript] = useState(transcript || '');

  const targetLanguage = availableLanguages.find(lang => lang.code === targetLangCode);

  const overlayStyle = {
    position: 'fixed',
    inset: '0',
    background: COLORS.BG_OVERLAY,
    zIndex: Z_INDEX.MODAL_BACKDROP,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const panelStyle = {
    background: COLORS.BG_CARD,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.XL,
    boxShadow: SHADOWS.PANEL,
    zIndex: Z_INDEX.MODAL,
    minWidth: WIDGET.PANEL_WIDTH.MIN,
    maxWidth: WIDGET.PANEL_WIDTH.MAX,
    color: COLORS.TEXT_DARK,
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SPACING.SM,
    borderBottom: `1px solid ${COLORS.BORDER_LIGHT}`,
    marginBottom: SPACING.MD,
  };

  const titleStyle = {
    fontSize: TYPOGRAPHY.SIZES.LG,
    fontWeight: TYPOGRAPHY.WEIGHTS.BOLD,
    color: COLORS.PRIMARY_BLUE,
    margin: '0',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    fontWeight: TYPOGRAPHY.WEIGHTS.BOLD,
    color: COLORS.TEXT_SECONDARY,
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    borderRadius: BORDER_RADIUS.CIRCLE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all 0.2s`,
  };

  const sectionStyle = {
    borderBottom: `1px solid ${COLORS.BORDER_LIGHT}`,
    paddingBottom: SPACING.MD,
    marginBottom: SPACING.MD,
  };

  const sectionTitleStyle = {
    fontSize: TYPOGRAPHY.SIZES.SM,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
    color: COLORS.TEXT_DARK,
    margin: `0 0 ${SPACING.MD} 0`,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const recordButtonStyle = {
    background: isRecording ? COLORS.ERROR : COLORS.SUCCESS,
    color: COLORS.TEXT_LIGHT,
    border: 'none',
    padding: `${SPACING.MD} ${SPACING.XXL}`,
    borderRadius: BORDER_RADIUS.FULL,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.SIZES.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    transition: `all ${ANIMATION.DEFAULT}`,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.SM,
  };

  const textareaStyle = {
    width: '100%',
    padding: SPACING.SM,
    border: `1px solid ${COLORS.BORDER_MEDIUM}`,
    borderRadius: BORDER_RADIUS.MD,
    fontSize: TYPOGRAPHY.SIZES.XS,
    resize: 'vertical',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    minHeight: '120px',
    color: COLORS.TEXT_DARK,
  };

  const generateButtonStyle = {
    background: COLORS.ACCENT_ORANGE,
    color: COLORS.TEXT_LIGHT,
    border: 'none',
    padding: `${SPACING.SM} ${SPACING.MD}`,
    borderRadius: BORDER_RADIUS.MD,
    fontWeight: TYPOGRAPHY.WEIGHTS.BOLD,
    cursor: 'pointer',
    fontSize: TYPOGRAPHY.SIZES.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    transition: `all 0.2s`,
    marginTop: SPACING.SM,
  };

  const summaryBoxStyle = {
    marginTop: SPACING.MD,
    padding: SPACING.MD,
    background: '#f3f4f6',
    border: `1px solid ${COLORS.BORDER_LIGHT}`,
    borderRadius: BORDER_RADIUS.MD,
    whiteSpace: 'pre-wrap',
    color: COLORS.TEXT_DARK,
    fontSize: TYPOGRAPHY.SIZES.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    minHeight: '80px',
    lineHeight: TYPOGRAPHY.LINE_HEIGHTS.RELAXED,
  };

  const handleRecordToggle = useCallback(() => {
    if (isRecording) {
      onStopRecording?.();
    } else {
      onStartRecording?.();
    }
  }, [isRecording, onStartRecording, onStopRecording]);

  const handleGenerateSummary = useCallback(() => {
    onGenerateSummary?.(localTranscript);
  }, [localTranscript, onGenerateSummary]);

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={panelStyle}>
        {/* Panel Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>Meeting Notes</h2>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.HOVER_BG;
              e.target.style.color = COLORS.TEXT_DARK;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = COLORS.TEXT_SECONDARY;
            }}
          >
            ×
          </button>
        </div>

        {/* Recording Controls Section */}
        <div style={sectionStyle}>
          <h4 style={sectionTitleStyle}>Record Meeting</h4>
          <button 
            style={recordButtonStyle}
            onClick={handleRecordToggle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = SHADOWS.MD;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {isRecording ? (
              <>
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: COLORS.TEXT_LIGHT,
                  borderRadius: BORDER_RADIUS.CIRCLE,
                  animation: 'pulse 2s infinite',
                }} />
                STOP RECORDING
              </>
            ) : (
              <>
                🎤 START RECORDING
              </>
            )}
          </button>
        </div>

        {/* Transcript Section */}
        <div style={{ marginBottom: SPACING.MD }}>
          <h4 style={sectionTitleStyle}>Meeting Transcript</h4>
          <textarea 
            style={textareaStyle}
            value={localTranscript}
            onChange={(e) => setLocalTranscript(e.target.value)}
            placeholder="Meeting transcript will appear here as you speak..."
            rows={5}
          />
          
          <button 
            style={generateButtonStyle}
            onClick={handleGenerateSummary}
            disabled={!localTranscript.trim()}
            onMouseEnter={(e) => {
              if (!e.target.disabled) {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = SHADOWS.MD;
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Generate Summary ({targetLanguage?.name || 'English'})
          </button>
        </div>

        {/* Summary Output */}
        <div>
          <h4 style={sectionTitleStyle}>Meeting Summary</h4>
          <div style={summaryBoxStyle}>
            {meetingSummary || 'Meeting summary will appear here after generating from transcript.'}
          </div>
        </div>

        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ModernNotesPanel;