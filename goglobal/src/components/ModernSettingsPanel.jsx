import React from 'react';
import { COLORS, SHADOWS, BORDER_RADIUS, WIDGET, Z_INDEX, TYPOGRAPHY, SPACING, ANIMATION } from '../design-tokens';

const ModernSettingsPanel = ({ 
  isOpen,
  onClose,
  targetLangCode, 
  setTargetLangCode, 
  isSubtitleOn, 
  setIsSubtitleOn, 
  isDubbingOn, 
  setIsDubbingOn,
  selectedVoiceURI, 
  setSelectedVoiceURI, 
  availableVoices,
  availableLanguages 
}) => {
  if (!isOpen) return null;

  // Filter voices to only show those matching the currently selected target language
  const voicesForTargetLang = availableVoices.filter(voice => 
    voice.lang.toLowerCase().startsWith(targetLangCode.toLowerCase())
  );

  const handleVoiceChange = (e) => {
    const newVoiceURI = e.target.value;
    setSelectedVoiceURI(newVoiceURI);
    // Test voice functionality would be handled by parent component
  };

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
    paddingBottom: SPACING.LG,
    marginBottom: SPACING.LG,
  };

  const labelStyle = {
    fontSize: TYPOGRAPHY.SIZES.SM,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
    color: COLORS.TEXT_DARK,
    display: 'block',
    marginBottom: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const helpTextStyle = {
    fontSize: TYPOGRAPHY.SIZES.XS,
    color: COLORS.TEXT_SECONDARY,
    margin: `0 0 ${SPACING.MD} 0`,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const selectStyle = {
    padding: SPACING.MD,
    border: `1px solid ${COLORS.BORDER_MEDIUM}`,
    borderRadius: BORDER_RADIUS.MD,
    background: '#f9fafb',
    width: '100%',
    fontSize: TYPOGRAPHY.SIZES.BASE,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    color: COLORS.TEXT_DARK,
  };

  const toggleContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.LG,
  };

  const toggleLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.MD,
    cursor: 'pointer',
    padding: SPACING.LG,
    border: `1px solid ${COLORS.BORDER_LIGHT}`,
    borderRadius: BORDER_RADIUS.MD,
    transition: `background-color 0.2s`,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    accentColor: COLORS.PRIMARY_BLUE,
  };

  const toggleTitleStyle = {
    color: COLORS.TEXT_DARK,
    fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
    fontSize: TYPOGRAPHY.SIZES.BASE,
    margin: '0',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  const toggleDescStyle = {
    fontSize: TYPOGRAPHY.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
    margin: '0',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={panelStyle}>
        {/* Panel Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>Output Language Settings</h2>
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

        {/* Language Selection Section */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Your Primary Language</label>
          <p style={helpTextStyle}>
            Any language spoken will be automatically translated to this language
          </p>
          <select 
            value={targetLangCode} 
            onChange={(e) => {
              setTargetLangCode(e.target.value);
              setSelectedVoiceURI(null); // Reset voice when language changes
            }}
            style={selectStyle}
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Output Mode Section */}
        <div style={sectionStyle}>
          <p style={{
            fontSize: TYPOGRAPHY.SIZES.BASE,
            fontWeight: TYPOGRAPHY.WEIGHTS.SEMIBOLD,
            color: COLORS.TEXT_DARK,
            margin: `0 0 ${SPACING.LG} 0`,
            fontFamily: TYPOGRAPHY.FONT_FAMILY,
          }}>
            Output Mode:
          </p>
          
          <div style={toggleContainerStyle}>
            {/* Subtitle Toggle */}
            <label 
              style={toggleLabelStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <input 
                type="checkbox" 
                checked={isSubtitleOn} 
                onChange={(e) => setIsSubtitleOn(e.target.checked)} 
                style={checkboxStyle}
              />
              <div>
                <div style={toggleTitleStyle}>Subtitle Display (Sub)</div>
                <div style={toggleDescStyle}>Show translations as text at the bottom.</div>
              </div>
            </label>

            {/* Dub Toggle */}
            <label 
              style={toggleLabelStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <input 
                type="checkbox" 
                checked={isDubbingOn} 
                onChange={(e) => setIsDubbingOn(e.target.checked)} 
                style={checkboxStyle}
              />
              <div>
                <div style={toggleTitleStyle}>Audio Dubbing (Dub)</div>
                <div style={toggleDescStyle}>Hear translations spoken in your language.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Voice Selection Section */}
        <div>
          <label style={labelStyle}>
            Voice for {availableLanguages.find(l => l.code === targetLangCode)?.name || 'Selected Language'} Dubbing
          </label>
          <select 
            value={selectedVoiceURI || ''} 
            onChange={handleVoiceChange}
            style={selectStyle}
            disabled={!isDubbingOn}
          >
            <option value="">-- Best Available Voice --</option>
            {voicesForTargetLang.map((voice, index) => (
              <option key={index} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ModernSettingsPanel;