import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LiveSpeechInput from './LiveSpeechInput';
import { AZURE_SUPPORTED_LANGUAGES } from '../constants/languages';

export default function NotesPanel({ 
  isOpen, 
  onClose, 
  fullTranscript, 
  targetLangCode, 
  onTranscript,
  summaryOutput,
  summaryLoading,
  summaryError,
  onGenerateSummary
}) {
  const availableLanguages = AZURE_SUPPORTED_LANGUAGES;

  const summaryLanguageName = availableLanguages.find(l => l.code === targetLangCode)?.name || 'English';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="panel-overlay fixed inset-0 bg-black/30 z-40"
          />

          {/* Panel - Made smaller (4/5 size) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className={"panel fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-sm p-5"}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <h2 className="text-blue-600 text-base">Meeting Notes</h2>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3 text-sm">
              {/* Recording Controls */}
              <div className="pb-3 border-b border-gray-200">
                <h4 className="text-gray-800 mb-2 font-medium text-sm">Record Meeting</h4>
                <LiveSpeechInput onTranscript={onTranscript} />
              </div>
              
              {/* Transcript Area */}
              <textarea 
                className="w-full px-2.5 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" 
                rows={4} 
                value={fullTranscript}
                readOnly
                placeholder="Meeting transcript will appear here as you speak..."
              />
              
              {/* Generate Summary Button */}
              <button 
                onClick={onGenerateSummary}
                disabled={summaryLoading || !fullTranscript.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-2 px-3 rounded-lg transition-colors text-sm"
              >
                {summaryLoading ? 'Generating...' : `Generate Summary (${summaryLanguageName})`}
              </button>
              
              {/* Summary Output */}
              <div className="p-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 text-xs min-h-[60px] whitespace-pre-wrap">
                {summaryOutput || "Meeting summary will appear here."}
              </div>
              
              {summaryError && (
                <p className="text-red-500 text-xs">Error: {summaryError}</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}