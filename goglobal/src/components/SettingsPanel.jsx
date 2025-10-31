import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubtitlePreview from './SubtitlePreview';
import { AZURE_SUPPORTED_LANGUAGES } from '../constants/languages';

export default function SettingsPanel({ 
  isOpen, 
  onClose, 
  subtitleSettings, 
  onSubtitleSettingsChange, 
  targetLangCode, 
  setTargetLangCode, 
  isSubtitleOn, 
  setIsSubtitleOn, 
  isDubbingOn, 
  setIsDubbingOn,
  selectedVoiceURI,
  setSelectedVoiceURI,
  availableVoices
}) {
  const [isResizing, setIsResizing] = useState(false);

  const availableLanguages = AZURE_SUPPORTED_LANGUAGES;

  const voicesForTargetLang = availableVoices.filter(voice => 
    voice.lang.toLowerCase().startsWith(targetLangCode.toLowerCase())
  );

  const handleResizingChange = (resizing) => {
    setIsResizing(resizing);
  };

  const handleApply = () => {
    onClose();
  };

  const handleVoiceChange = (e) => {
    const newVoiceURI = e.target.value;
    setSelectedVoiceURI(newVoiceURI);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtitle Preview - Outside popup, fixed position */}
          <SubtitlePreview
            color={subtitleSettings.color}
            backgroundColor={subtitleSettings.backgroundColor}
            size={subtitleSettings.size}
            onSizeChange={(size) => onSubtitleSettingsChange({ size })}
            onResizingChange={handleResizingChange}
            isVisible={subtitleSettings.enabled}
          />

          {/* Overlay - More opaque when resizing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isResizing ? 0.05 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="panel-overlay fixed inset-0 bg-black/30 z-40"
          />

          {/* Panel - Made smaller (4/5 size) with scrolling, very opaque when resizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: isResizing ? 0.2 : 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className={"panel fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-md p-5 max-h-[90vh] overflow-y-auto"}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <h2 className="text-blue-600 text-base">Output Language Settings</h2>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-sm">
              {/* Language Selection */}
              <div className="pb-4 border-b border-gray-200">
                <label className="block text-gray-800 mb-1.5 font-medium text-sm">
                  Your Primary Language
                </label>
                <p className="text-xs text-gray-600 mb-2">
                  Any language spoken will be automatically translated to this language
                </p>
                <select 
                  value={targetLangCode}
                  onChange={(e) => {
                    setTargetLangCode(e.target.value);
                    setSelectedVoiceURI(null);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableLanguages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>

              {/* Output Mode Toggles */}
              <div className="pb-4 border-b border-gray-200">
                <p className="text-gray-800 mb-3 font-medium text-sm">Output Mode:</p>
                
                {/* Subtitle Toggle */}
                <label className="flex items-start gap-2.5 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors mb-2.5">
                  <input 
                    type="checkbox" 
                    checked={isSubtitleOn}
                    onChange={(e) => {
                      setIsSubtitleOn(e.target.checked);
                      onSubtitleSettingsChange({ enabled: e.target.checked });
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <div>
                    <div className="text-gray-800 text-sm">Subtitle Display (Sub)</div>
                    <div className="text-xs text-gray-600">Show translations as text at the bottom.</div>
                  </div>
                </label>

                {/* Subtitle Customization */}
                {isSubtitleOn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    {/* Instruction */}
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">
                        👇 Adjust subtitle at the bottom of your screen
                      </p>
                      <p className="text-xs text-gray-500">
                        Click to show handles • Drag to resize
                      </p>
                    </div>
                    
                    {/* Color Inputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 mb-1.5 text-xs">Text Color</label>
                        <input 
                          type="color" 
                          value={subtitleSettings.color}
                          onChange={(e) => onSubtitleSettingsChange({ color: e.target.value })}
                          className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1.5 text-xs">Background</label>
                        <input 
                          type="color" 
                          value={subtitleSettings.backgroundColor}
                          onChange={(e) => onSubtitleSettingsChange({ backgroundColor: e.target.value })}
                          className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Dub Toggle */}
                <label className="flex items-start gap-2.5 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={isDubbingOn}
                    onChange={(e) => setIsDubbingOn(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <div>
                    <div className="text-gray-800 text-sm">Audio Dubbing (Dub)</div>
                    <div className="text-xs text-gray-600">Hear translations spoken in your language.</div>
                  </div>
                </label>
              </div>

              {/* Voice Selector - only visible if Dubbing is ON */}
              {isDubbingOn && (
                <div>
                  <label className="block text-gray-800 mb-1.5 font-medium text-sm">
                    Voice for {availableLanguages.find(l => l.code === targetLangCode)?.name} Dubbing
                  </label>
                  <select 
                    value={selectedVoiceURI || ''}
                    onChange={handleVoiceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Best Available Voice --</option>
                    {voicesForTargetLang.map(voice => (
                      <option key={voice.voiceURI} value={voice.voiceURI}>
                        {voice.name} ({voice.localService ? 'Local' : 'Cloud'})
                      </option>
                    ))}
                  </select>
                  {voicesForTargetLang.length === 0 && (
                    <p className="text-sm text-red-500 mt-2">
                      No voices available for {availableLanguages.find(l => l.code === targetLangCode)?.name}. System will use default voice.
                    </p>
                  )}
                </div>
              )}

              {/* Apply Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4" />
                  Apply Settings
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}