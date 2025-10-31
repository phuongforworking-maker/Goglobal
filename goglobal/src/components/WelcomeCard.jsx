import React, { useState, useEffect } from 'react';
import { COLORS, SHADOWS, BORDER_RADIUS, TYPOGRAPHY, SPACING, ANIMATION, Z_INDEX } from '../design-tokens';

const WelcomeCard = ({ isVisible = true, onDismiss, autoHideAfter = 10000 }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible && autoHideAfter) {
      const timer = setTimeout(() => {
        setShow(false);
        onDismiss?.();
      }, autoHideAfter);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideAfter, onDismiss]);

  if (!show) return null;

  const cardStyle = {
    position: 'fixed',
    top: SPACING.XXXL,
    left: SPACING.XXXL,
    maxWidth: '384px',
    background: COLORS.BG_CARD,
    padding: SPACING.LG,
    borderRadius: BORDER_RADIUS.LG,
    boxShadow: SHADOWS.MD,
    border: `1px solid ${COLORS.BORDER_LIGHT}`,
    color: COLORS.TEXT_DARK,
    zIndex: Z_INDEX.TOAST,
    animation: 'slideInFade 0.5s ease-out',
  };

  const titleStyle = {
    fontSize: TYPOGRAPHY.SIZES.XL,
    fontWeight: TYPOGRAPHY.WEIGHTS.BOLD,
    color: COLORS.PRIMARY_BLUE,
    margin: `0 0 ${SPACING.SM} 0`,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const descriptionStyle = {
    fontSize: TYPOGRAPHY.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
    margin: `0 0 ${SPACING.MD} 0`,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    lineHeight: TYPOGRAPHY.LINE_HEIGHTS.RELAXED,
  };

  const featureListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.SM,
    marginTop: SPACING.MD,
  };

  const featureItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.SM,
    fontSize: TYPOGRAPHY.SIZES.XS,
    color: COLORS.TEXT_SECONDARY,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const iconStyle = {
    fontSize: TYPOGRAPHY.SIZES.SM,
    minWidth: '16px',
  };

  const dismissButtonStyle = {
    position: 'absolute',
    top: SPACING.SM,
    right: SPACING.SM,
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: COLORS.TEXT_SECONDARY,
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    borderRadius: BORDER_RADIUS.CIRCLE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all 0.2s`,
  };

  const handleDismiss = () => {
    setShow(false);
    onDismiss?.();
  };

  return (
    <>
      <style>
        {`
          @keyframes slideInFade {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div style={cardStyle}>
        {/* Dismiss button */}
        <button 
          style={dismissButtonStyle}
          onClick={handleDismiss}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = COLORS.HOVER_BG;
            e.target.style.color = COLORS.TEXT_DARK;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = COLORS.TEXT_SECONDARY;
          }}
          title="Dismiss"
        >
          ×
        </button>

        {/* Content */}
        <h1 style={titleStyle}>
          Welcome to Goglobal
        </h1>
        
        <p style={descriptionStyle}>
          Your floating language assistant. The widget can be dragged anywhere on your screen and will remember its position.
        </p>
        
        <div style={featureListStyle}>
          <div style={featureItemStyle}>
            <span style={{...iconStyle, color: COLORS.PRIMARY_BLUE}}>⚙️</span>
            <span>Settings: Configure output language and modes</span>
          </div>
          <div style={featureItemStyle}>
            <span style={{...iconStyle, color: COLORS.ACCENT_ORANGE}}>📝</span>
            <span>Notes: Record and summarize meetings</span>
          </div>
          <div style={featureItemStyle}>
            <span style={{...iconStyle, color: COLORS.SUCCESS}}>🌍</span>
            <span>Live Translation: Real-time speech translation</span>
          </div>
          <div style={featureItemStyle}>
            <span style={{...iconStyle, color: COLORS.PRIMARY_BLUE}}>🎯</span>
            <span>Drag the globe icon to move it anywhere</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeCard;