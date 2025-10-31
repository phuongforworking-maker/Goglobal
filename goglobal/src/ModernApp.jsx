import React, { useState, useCallback, useEffect } from 'react';
import FloatingWidget from './components/FloatingWidget';
import ModernSettingsPanel from './components/ModernSettingsPanel';
import ModernNotesPanel from './components/ModernNotesPanel';
import LiveTranscriptPopup from './components/LiveTranscriptPopup';
import WelcomeCard from './components/WelcomeCard';
import SubtitleBar from './components/SubtitleBar';
import { COLORS } from './design-tokens';

// Import existing services
import { 
  detectAndTranslate, 
  getClarificationPrompt, 
  getMeetingSummary, 
  speakText 
} from './services/apiService';

// List of supported language codes
const availableLanguages = [
  { code: 'en', name: 'English', spokenCode: 'en-US' },
  { code: 'es', name: 'Spanish', spokenCode: 'es-ES' },
  { code: 'fr', name: 'French', spokenCode: 'fr-FR' },
  { code: 'de', name: 'German', spokenCode: 'de-DE' },
  { code: 'zh', name: 'Mandarin', spokenCode: 'zh-CN' }, 
  { code: 'ko', name: 'Korean', spokenCode: 'ko-KR' },  
  { code: 'ja', name: 'Japanese', spokenCode: 'ja-JP' },
  { code: 'vi', name: 'Vietnamese', spokenCode: 'vi-VN' },
];

const ModernApp = () => {
  // UI State
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  
  // Widget position state
  const [widgetPosition, setWidgetPosition] = useState(() => {
    const saved = localStorage.getItem('goglobal-widget-position');
    return saved ? JSON.parse(saved) : { x: 50, y: 50 };
  });
  
  // Translation settings
  const [targetLangCode, setTargetLangCode] = useState('en');
  const [isSubtitleOn, setIsSubtitleOn] = useState(true);
  const [isDubbingOn, setIsDubbingOn] = useState(false);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(null);
  
  // Speech and transcript state
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [transcript, setTranscript] = useState('');
  const [meetingSummary, setMeetingSummary] = useState('');
  
  // Available voices
  const [availableVoices, setAvailableVoices] = useState([]);

  // Load available voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Save widget position to localStorage
  const handlePositionChange = useCallback((newPosition) => {
    setWidgetPosition(newPosition);
    localStorage.setItem('goglobal-widget-position', JSON.stringify(newPosition));
  }, []);

  // Handle settings panel
  const handleSettingsClick = useCallback(() => {
    setIsSettingsPanelOpen(true);
  }, []);

  const handleSettingsClose = useCallback(() => {
    setIsSettingsPanelOpen(false);
  }, []);

  // Handle notes panel and listening toggle
  const handleNotesClick = useCallback(() => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      setIsTranscriptVisible(false);
    } else {
      // Start listening
      setIsListening(true);
      setIsTranscriptVisible(true);
    }
  }, [isListening]);

  const handleNotesOpen = useCallback(() => {
    setIsNotesPanelOpen(true);
  }, []);

  const handleNotesClose = useCallback(() => {
    setIsNotesPanelOpen(false);
  }, []);

  // Handle recording controls
  const handleStartRecording = useCallback(() => {
    setIsListening(true);
    setIsTranscriptVisible(true);
  }, []);

  const handleStopRecording = useCallback(() => {
    setIsListening(false);
    setIsTranscriptVisible(false);
  }, []);

  // Handle summary generation
  const handleGenerateSummary = useCallback(async (transcriptText) => {
    try {
      const summary = await getMeetingSummary(transcriptText, targetLangCode);
      setMeetingSummary(summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setMeetingSummary('Error generating summary. Please try again.');
    }
  }, [targetLangCode]);

  // Handle voice testing
  const handleVoiceChange = useCallback((voiceURI) => {
    setSelectedVoiceURI(voiceURI);
    if (voiceURI) {
      speakText(`Testing voice for ${targetLangCode}`, targetLangCode, voiceURI);
    }
  }, [targetLangCode]);

  // Handle translation updates (this would be connected to your speech recognition)
  const handleTranslationUpdate = useCallback((originalText, translatedText) => {
    setCurrentTranscript(originalText);
    setCurrentTranslation(translatedText);
    setTranscript(prev => prev + '\n' + originalText);
    
    // Handle dubbing if enabled
    if (isDubbingOn && translatedText) {
      speakText(translatedText, targetLangCode, selectedVoiceURI);
    }
  }, [isDubbingOn, targetLangCode, selectedVoiceURI]);

  // App background style
  const appStyle = {
    minHeight: '100vh',
    backgroundColor: '#f0f0f0', // Temporarily lighter for debugging
    color: COLORS.TEXT_DARK,
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    position: 'relative',
    padding: '32px',
  };

  return (
    <div style={appStyle}>
      {/* Debug info */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        zIndex: 10000,
        fontSize: '12px',
        color: 'black'
      }}>
        Debug: App Loaded<br/>
        Welcome Card: {showWelcomeCard ? 'Visible' : 'Hidden'}<br/>
        Widget Position: {widgetPosition.x}, {widgetPosition.y}
      </div>

      {/* Welcome Card */}
      <WelcomeCard 
        isVisible={showWelcomeCard}
        onDismiss={() => setShowWelcomeCard(false)}
        autoHideAfter={15000} // Auto hide after 15 seconds
      />

      {/* Floating Widget */}
      <FloatingWidget
        onSettingsClick={handleSettingsClick}
        onNotesClick={handleNotesClick}
        isListening={isListening}
        position={widgetPosition}
        onPositionChange={handlePositionChange}
      />

      {/* Settings Panel */}
      <ModernSettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={handleSettingsClose}
        targetLangCode={targetLangCode}
        setTargetLangCode={setTargetLangCode}
        isSubtitleOn={isSubtitleOn}
        setIsSubtitleOn={setIsSubtitleOn}
        isDubbingOn={isDubbingOn}
        setIsDubbingOn={setIsDubbingOn}
        selectedVoiceURI={selectedVoiceURI}
        setSelectedVoiceURI={handleVoiceChange}
        availableVoices={availableVoices}
        availableLanguages={availableLanguages}
      />

      {/* Notes Panel */}
      <ModernNotesPanel
        isOpen={isNotesPanelOpen}
        onClose={handleNotesClose}
        transcript={transcript}
        isRecording={isListening}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        onGenerateSummary={handleGenerateSummary}
        meetingSummary={meetingSummary}
        targetLangCode={targetLangCode}
        availableLanguages={availableLanguages}
      />

      {/* Live Transcript Popup */}
      <LiveTranscriptPopup
        isVisible={isTranscriptVisible}
        currentTranscript={currentTranslation || currentTranscript}
        targetLangCode={targetLangCode}
        setTargetLangCode={setTargetLangCode}
        availableLanguages={availableLanguages}
        isListening={isListening}
      />

      {/* Subtitle Bar */}
      {isSubtitleOn && currentTranslation && (
        <SubtitleBar text={currentTranslation} />
      )}

      {/* Quick access button to notes panel */}
      <button
        onClick={handleNotesOpen}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: COLORS.ACCENT_ORANGE,
          color: COLORS.TEXT_LIGHT,
          border: 'none',
          padding: '12px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1000,
        }}
      >
        📝 Open Notes
      </button>
    </div>
  );
};

export default ModernApp;