import React, { useState, useCallback, useEffect } from 'react';
import GoglobalWidget from './components/GoglobalWidget'; 
import LiveSpeechInput from './components/LiveSpeechInput'; 
import SubtitleBar from './components/SubtitleBar'; 
import { 
  detectAndTranslate, 
  getClarificationPrompt, 
  getMeetingSummary, 
  speakText 
} from './services/apiService'; 

// Define unique brand colors 
const COLORS = {
  BACKGROUND: '#333333', // Dark background for contrast/readability
  CARD: '#ffffffff', // White card for contrast
  PRIMARY: '#007bff', // Blue
  ACCENT: '#ff9800', // Orange
  TEXT_DARK: '#333333',
  TEXT_LIGHT: '#ffffff', // White text on dark background
};

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

// --- Output Language Settings Panel ---
const OutputLanguagePanel = ({ 
    targetLangCode, setTargetLangCode, isSubtitleOn, setIsSubtitleOn, isDubbingOn, setIsDubbingOn,
    selectedVoiceURI, setSelectedVoiceURI, availableVoices
}) => {
    // Filter voices to only show those matching the currently selected target language
    const voicesForTargetLang = availableVoices.filter(voice => voice.lang.toLowerCase().startsWith(targetLangCode.toLowerCase()));

    const handleVoiceChange = (e) => {
        const newVoiceURI = e.target.value;
        setSelectedVoiceURI(newVoiceURI);
        if (newVoiceURI) {
             speakText(`Testing voice for ${targetLangCode}`, targetLangCode, newVoiceURI);
        }
    };
    
    const handleSubtitleToggle = () => setIsSubtitleOn(prev => !prev);
    const handleDubbingToggle = () => setIsDubbingOn(prev => !prev);

    return (
        <div className="p-4 bg-white rounded-lg shadow space-y-4">
            <h3 className="text-lg font-bold text-gray-900" style={{ color: COLORS.PRIMARY }}>Output Language Settings</h3>
            
            {/* 1. Primary Language Selection */}
            <div className="border-b pb-4">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Your Primary Language</label>
                <p className="text-xs text-gray-500 mb-3">Any language spoken will be automatically translated to this language</p>
                <select 
                    value={targetLangCode} 
                    onChange={(e) => {
                        setTargetLangCode(e.target.value);
                        setSelectedVoiceURI(null); // Reset voice when language changes
                    }} 
                    className="p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900 w-full"
                >
                    {availableLanguages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>

            {/* 2. Output Mode Selection (Sub/Dub TOGGLES) */}
            <div className="space-y-4 border-b pb-4">
                <p className="text-base text-gray-900 font-semibold">Output Mode:</p>
                
                {/* Subtitle Toggle */}
                <label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-md hover:bg-gray-50">
                    <input 
                        type="checkbox" 
                        checked={isSubtitleOn} 
                        onChange={handleSubtitleToggle} 
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                    <div>
                        <div className="text-gray-900 font-semibold text-base">Subtitle Display (Sub)</div>
                        <div className="text-sm text-gray-600">Show translations as text at the bottom.</div>
                    </div>
                </label>

                {/* Dub Toggle */}
                <label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-md hover:bg-gray-50">
                    <input 
                        type="checkbox" 
                        checked={isDubbingOn} 
                        onChange={handleDubbingToggle} 
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                    <div>
                        <div className="text-gray-900 font-semibold text-base">Audio Dubbing (Dub)</div>
                        <div className="text-sm text-gray-600">Hear translations spoken in your language.</div>
                    </div>
                </label>
            </div>

            {/* 3. Voice Selector - only visible if Dubbing is ON */}
            {isDubbingOn && (
                <div className="flex flex-col pt-3">
                    <label className="text-sm font-semibold text-gray-700 mb-2">Voice for {availableLanguages.find(l => l.code === targetLangCode)?.name} Dubbing</label>
                    <select 
                        value={selectedVoiceURI || ''} 
                        onChange={handleVoiceChange} 
                        className="p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
                    >
                        <option value="">-- Best Available Voice --</option>
                        {voicesForTargetLang.map(voice => (
                            <option key={voice.voiceURI} value={voice.voiceURI}>
                                {voice.name} ({voice.localService ? 'Local' : 'Cloud'})
                            </option>
                        ))}
                    </select>
                    {voicesForTargetLang.length === 0 && (
                           <p className="text-sm text-red-500 mt-2">No voices available for {availableLanguages.find(l => l.code === targetLangCode)?.name}. System will use default voice.</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">Any detected language will be spoken in {availableLanguages.find(l => l.code === targetLangCode)?.name}</p>
                </div>
            )}
        </div>
    );
};

// --- Meeting Summarizer Component (Used for 'Note' feature) ---
const MeetingSummarizer = ({ fullTranscript, targetLangCode, onTranscript }) => {
    const [summaryOutput, setSummaryOutput] = useState('Meeting summary will appear here.');
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const summaryLanguageName = availableLanguages.find(l => l.code === targetLangCode)?.name || 'English';

    const handleGenerateSummary = async () => {
        if (!fullTranscript.trim()) {
            setSummaryOutput("No transcript available to summarize.");
            return;
        }
        setSummaryLoading(true);
        setSummaryError(null);
        setSummaryOutput(`Generating summary in ${summaryLanguageName}...`);
        try {
            const result = await getMeetingSummary(fullTranscript, summaryLanguageName);
            setSummaryOutput(result);
        } catch (err) {
            setSummaryError(err.message || "Summary generation failed. Check Gemini API key.");
            setSummaryOutput("Summary Failed");
        } finally {
            setSummaryLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow space-y-3">
            <h3 className="text-md font-bold mb-2 text-gray-900" style={{ color: COLORS.PRIMARY }}>Meeting Notes</h3>
            
            {/* Recording Controls */}
            <div className="space-y-3 border-b pb-3">
                <h4 className="text-sm font-semibold text-gray-900">Record Meeting</h4>
                <LiveSpeechInput 
                    onTranscript={onTranscript} 
                />
            </div>
            
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 text-xs"
                rows="5"
                value={fullTranscript}
                readOnly 
                placeholder="Meeting transcript will appear here as you speak..."
            />
            <button 
                onClick={handleGenerateSummary} 
                disabled={summaryLoading || !fullTranscript.trim()}
                style={{ backgroundColor: summaryLoading ? '#6c757d' : COLORS.ACCENT }}
                className="px-3 py-1 text-white font-bold rounded-md hover:opacity-90 transition-opacity text-sm"
            >
                {summaryLoading ? 'Generating...' : `Generate Summary (${summaryLanguageName})`}
            </button>
            <p className="mt-3 p-3 bg-gray-100 border border-gray-200 rounded-md whitespace-pre-wrap text-gray-900 text-sm">
                {summaryOutput}
            </p>
            {summaryError && <p className="text-red-500 mt-1 text-xs">Error: {summaryError}</p>}
        </div>
    );
};


function App() {
  const [translatedText, setTranslatedText] = useState('Translation will appear here.');
  const [targetLangCode, setTargetLangCode] = useState('es'); 
  const [activeFeature, setActiveFeature] = useState(null); 
  const [isSubtitleOn, setIsSubtitleOn] = useState(false); // Subtitle OFF by default
  const [isDubbingOn, setIsDubbingOn] = useState(false); // Dubbing OFF by default
  const [fullTranscript, setFullTranscript] = useState(''); 
  const [availableVoices, setAvailableVoices] = useState([]); 
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(null); 
  const [dialogueHistory, setDialogueHistory] = useState([]); 

  // --- Voice Loader useEffect (Loads voices when component mounts) ---
  useEffect(() => {
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        // Clear the listener after use to prevent multiple calls
        window.speechSynthesis.onvoiceschanged = null; 
    };
    
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.getVoices().length > 0) {
            loadVoices();
        } else {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }
  }, []);

  // --- Handler for Note-taking Speech Input ---
  const handleNoteTranscription = useCallback((text) => {
    if (!text.trim()) return;

    // Record speech for transcript (for note-taking only)
    setFullTranscript(prev => prev + text + ' ');
    setDialogueHistory(prev => [
        ...prev, 
        { id: Date.now(), type: 'transcript', text: text, time: new Date().toLocaleTimeString() }
    ]);
  }, []); 


  const activePanelContent = () => {
    switch (activeFeature) {
        case 'voice':
            // VOICE ICON: Used for output language settings
            return <OutputLanguagePanel 
                        isSubtitleOn={isSubtitleOn} 
                        setIsSubtitleOn={setIsSubtitleOn}
                        isDubbingOn={isDubbingOn}
                        setIsDubbingOn={setIsDubbingOn}
                        targetLangCode={targetLangCode}
                        setTargetLangCode={setTargetLangCode}
                        selectedVoiceURI={selectedVoiceURI}
                        setSelectedVoiceURI={setSelectedVoiceURI}
                        availableVoices={availableVoices}
                    />;
        case 'note':
            // NOTE ICON: Summarizer with recording
            return <MeetingSummarizer 
                        fullTranscript={fullTranscript} 
                        targetLangCode={targetLangCode} 
                        onTranscript={handleNoteTranscription}
                    />;
        default:
            return null;
    }
  };

  return (
    // Use a dark background to emphasize the floating agent design
    <div className="relative min-h-screen p-8 font-inter antialiased" style={{ backgroundColor: COLORS.BACKGROUND }}>
        
        {/* 1. AGENT POP-OUT PANEL (Conditional) */}
        {activeFeature && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-2xl z-40 min-w-[350px] max-w-sm border border-gray-200 animate-in fade-in duration-200">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900" style={{ color: COLORS.PRIMARY }}>
                        {activeFeature === 'voice' && 'Output Language Settings'}
                        {activeFeature === 'note' && 'Meeting Notes'}
                    </h2>
                    <button 
                        onClick={() => setActiveFeature(null)} 
                        className="text-gray-500 hover:text-gray-900 text-xl font-bold hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        &times;
                    </button>
                </div>
                
                {/* Content based on selected feature */}
                <div className="pt-3">
                    {activePanelContent()}
                </div>
            </div>
        )}

        {/* Backdrop overlay when panel is open */}
        {activeFeature && (
            <div 
                className="fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity duration-200"
                onClick={() => setActiveFeature(null)}
            />
        )}

        {/* 2. NEW GOGLOBAL WIDGET (Enhanced Multi-language Widget) */}
        <GoglobalWidget setActiveFeature={setActiveFeature} />
        
        {/* 3. GLOBAL SUBTITLE BAR (Movable Output) */}
        {isSubtitleOn && (
            <SubtitleBar 
                translatedText={translatedText} 
                targetLangCode={targetLangCode}
                dialogueHistory={dialogueHistory}
            />
        )}
        
        {/* Welcome message for first-time users */}
        {!activeFeature && (
            <div className="fixed top-8 left-8 max-w-md">
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ color: COLORS.PRIMARY }}>
                        Welcome to Goglobal
                    </h1>
                    <p className="text-sm text-gray-600 mb-3">
                        Your floating language assistant. The widget can be dragged anywhere on your screen and will remember its position.
                    </p>
                    <div className="flex flex-col space-y-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                            <i className="fa fa-cog text-blue-500"></i>
                            <span>Settings: Configure output language and modes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fa fa-book text-orange-500"></i>
                            <span>Notes: Record and summarize meetings</span>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default App;
