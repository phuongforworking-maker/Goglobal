/* Minimal backend proxy for Goglobal
   - Provides secure server-side endpoints so provider keys live on the server (not in client bundles)
   - Endpoints implemented:
     POST /api/translate    { text, to }
     POST /api/summarize    { transcript, language }
     POST /api/speech       (placeholder) { audio } - not implemented fully here
   - Configure secrets in Render dashboard or in environment with names (recommended):
       AZURE_TRANSLATOR_KEY, AZURE_REGION,
       PROMPT_API_KEY, SUMMARIZER_API_KEY,
       AZURE_SPEECH_KEY, AZURE_SPEECH_REGION
*/

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 5175;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Helper: prefer server env names but accept VITE_ variants for local parity
const env = (name) => process.env[name] || process.env[`VITE_${name}`] || process.env[`REACT_APP_${name}`];

const AZURE_KEY = env('AZURE_TRANSLATOR_KEY');
const AZURE_REGION = env('AZURE_REGION');
const PROMPT_KEY = env('PROMPT_API_KEY');
const SUMMARIZER_KEY = env('SUMMARIZER_API_KEY');
const AZURE_SPEECH_KEY = env('AZURE_AZURE_SPEECH_KEY') || env('AZURE_SPEECH_KEY');
const AZURE_SPEECH_REGION = env('AZURE_SPEECH_REGION');

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: { hasTranslator: !!AZURE_KEY, hasSummarizer: !!SUMMARIZER_KEY } });
});

// POST /api/translate -> proxies to Azure Translator Text API
app.post('/api/translate', async (req, res) => {
  const { text, to } = req.body;
  if (!AZURE_KEY || !AZURE_REGION) {
    return res.status(500).json({ error: 'Azure translator not configured on server.' });
  }

  if (!text) return res.status(400).json({ error: 'Missing `text` in body.' });
  const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${encodeURIComponent(to || 'en')}`;

  try {
    const response = await axios.post(url, [{ Text: text }], {
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
        'Ocp-Apim-Subscription-Region': AZURE_REGION,
        'Content-Type': 'application/json'
      }
    });

    const translation = response.data?.[0]?.translations?.[0]?.text || '';
    const detected = response.data?.[0]?.detectedLanguage?.language || 'unknown';
    return res.json({ translatedText: translation, detectedLang: detected, raw: response.data });
  } catch (err) {
    console.error('Translate proxy error:', err?.response?.data || err.message);
    return res.status(502).json({ error: 'Translate proxy failed', details: err?.response?.data || err.message });
  }
});

// POST /api/summarize -> proxies a summarization request to a generative model (Google/Gemini example)
app.post('/api/summarize', async (req, res) => {
  const { transcript, language } = req.body;
  if (!SUMMARIZER_KEY) return res.status(500).json({ error: 'Summarizer API key not configured on server.' });
  if (!transcript) return res.status(400).json({ error: 'Missing `transcript` in body.' });

  // NOTE: The exact request shape depends on your chosen provider. Below is an example for
  // Google Generative Language API (text-bison style). Adjust the URL/payload as needed.
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generate';
  const prompt = `Summarize the following meeting transcript in ${language || 'English'}. Focus on key decisions and action items.\n\n${transcript}`;

  try {
    const response = await axios.post(url, {
      prompt: { text: prompt },
      // optional parameters
      temperature: 0.2,
      maxOutputTokens: 800
    }, {
      headers: {
        'Authorization': `Bearer ${SUMMARIZER_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Try a few common response shapes
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
      || response.data?.output?.[0]?.content?.[0]?.text
      || JSON.stringify(response.data);

    return res.json({ summary: text });
  } catch (err) {
    console.error('Summarize proxy error:', err?.response?.data || err.message);
    return res.status(502).json({ error: 'Summarizer proxy failed', details: err?.response?.data || err.message });
  }
});

// Simple placeholder for speech proxy - longer integration required for streaming & binary audio
app.post('/api/speech', async (req, res) => {
  // This endpoint is a placeholder. Implement server-side streaming or file upload handling
  // for production-grade speech-to-text (large audio files, chunking, etc.).
  return res.status(501).json({ error: 'Speech proxy not implemented. Use client-side Web Speech API or extend server.' });
});

app.listen(port, () => {
  console.log(`Goglobal API proxy running on http://localhost:${port}`);
});
