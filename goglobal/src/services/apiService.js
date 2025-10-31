import axios from 'axios';

// New architecture: frontend calls the local backend proxy endpoints under /api/*.
// This keeps provider API keys on the server (secure) instead of embedding them in client bundles.

// POST /api/translate -> { text, to }
export async function detectAndTranslate(text, targetLang) {
  try {
    const resp = await axios.post('/api/translate', { text, to: targetLang });
    return { translatedText: resp.data.translatedText || '', detectedLang: resp.data.detectedLang || 'unknown' };
  } catch (err) {
    console.error('Client translate error:', err?.response?.data || err.message);
    throw new Error('Translation failed (proxy).');
  }
}

// POST /api/summarize -> { transcript, language }
export async function getMeetingSummary(fullTranscript, summaryLang = 'English') {
  try {
    const resp = await axios.post('/api/summarize', { transcript: fullTranscript, language: summaryLang });
    return resp.data.summary || 'No summary available.';
  } catch (err) {
    console.error('Client summarize error:', err?.response?.data || err.message);
    return 'Could not generate meeting summary.';
  }
}

// Simple wrapper for clarification prompts using the same summarize endpoint or a dedicated prompt endpoint
export async function getClarificationPrompt(ambiguousText) {
  try {
    const resp = await axios.post('/api/summarize', { transcript: ambiguousText, language: 'English' });
    // Best-effort: return a short line from the summary
    return (resp.data.summary || '').split('\n')[0] || 'Could not generate clarification prompt.';
  } catch (err) {
    console.error('Client prompt error:', err?.response?.data || err.message);
    return 'Could not generate clarification prompt.';
  }
}

// Speech proxy placeholder - call /api/speech for server-side speech-to-text
export async function azureSpeechToText(audioBlob, language = 'en-US') {
  try {
    // This endpoint is a placeholder on the backend - currently returns 501 until server is extended.
    const form = new FormData();
    form.append('audio', audioBlob);
    form.append('language', language);

    const resp = await axios.post('/api/speech', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    return resp.data?.transcript || '';
  } catch (err) {
    console.error('Speech proxy error:', err?.response?.data || err.message);
    throw new Error('Speech recognition failed (proxy).');
  }
}

// Client-side TTS using native browser API (unchanged)
export function speakText(text, lang, voiceURI) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const langPrefix = lang.split('-')[0].toLowerCase();
      let selectedVoice = voiceURI ? voices.find(v => v.voiceURI === voiceURI) : null;
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase() && v.localService)
          || voices.find(v => v.lang.toLowerCase() === lang.toLowerCase())
          || voices.find(v => v.lang.toLowerCase().startsWith(langPrefix) && v.localService)
          || voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
      }

      if (selectedVoice) utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) setVoice();
    else window.speechSynthesis.onvoiceschanged = () => { setVoice(); window.speechSynthesis.onvoiceschanged = null; };
  } else {
    console.warn('Text-to-Speech not supported in this browser.');
  }
}
