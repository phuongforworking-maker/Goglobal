import axios from 'axios';

// 1. Load keys from the secure .env file
const TRANSLATOR_KEY = import.meta.env.VITE_AZURE_TRANSLATOR_KEY; 
const AZURE_REGION = import.meta.env.VITE_AZURE_REGION; 
const PROMPT_KEY = import.meta.env.VITE_PROMPT_API_KEY; 
const SUMMARIZER_KEY = import.meta.env.VITE_SUMMARIZER_API_KEY;
const SPEECH_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY;
const SPEECH_REGION = import.meta.env.VITE_AZURE_SPEECH_REGION;

// 2. Define API Base URLs
const TRANSLATOR_BASE_URL = 'https://api.cognitive.microsofttranslator.com/';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/'; 

// ----------------------------------------------------
// 1. TRANSLATOR API (Azure) - Includes Language Detection
// ----------------------------------------------------

/**
 * Detects the source language and translates text to the target language.
 * @param {string} text The input text to translate.
 * @param {string} targetLang The desired output language code (e.g., 'es').
 * @returns {Promise<{translatedText: string, detectedLang: string}>}
 */
export async function detectAndTranslate(text, targetLang) {
    // Safety check for environment variables
    if (!TRANSLATOR_KEY || !AZURE_REGION) {
        console.error("Missing Translator configuration:", { TRANSLATOR_KEY, AZURE_REGION });
        throw new Error("Translator API configuration missing.");
    }
    
    // Azure performs detection and translation in one API call
    const url = `${TRANSLATOR_BASE_URL}translate?api-version=3.0&to=${targetLang}`;
    
    try {
        const response = await axios.post(url, 
            [{ 'Text': text }], 
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': TRANSLATOR_KEY,
                    'Ocp-Apim-Subscription-Region': AZURE_REGION,
                    'Content-type': 'application/json',
                }
            }
        );
        
        // Safe extraction with fallbacks
        const translation = response.data?.[0]?.translations?.[0]?.text || "";
        const detectedSource = response.data?.[0]?.detectedLanguage?.language || "unknown";

        return { translatedText: translation, detectedLang: detectedSource };

    } catch (error) {
        console.error("Translation API Error:", error.response ? error.response.data : error.message);
        throw new Error("Translation service failed. Check API Key, Endpoint URL, and network connection.");
    }
}

// ----------------------------------------------------
// 2. PROMPT API (GEMINI)
// ----------------------------------------------------

export async function getClarificationPrompt(ambiguousText) {
    if (!PROMPT_KEY) {
        throw new Error("Prompt API Key (Gemini) is missing.");
    }
    const model = 'gemini-2.5-flash:generateContent'; 
    const url = `${GEMINI_BASE_URL}${model}?key=${PROMPT_KEY}`;
    const promptContent = `The following text was transcribed from a meeting: "${ambiguousText}". Generate a short, single-sentence question to clarify the speaker's intent, such as "Did you mean the fiscal year or the calendar year?"`;
    
    try {
        const response = await axios.post(url, {
            contents: [{ role: "user", parts: [{ text: promptContent }] }]
        });
        
        // Safe extraction with fallback
        const candidate = response.data?.candidates?.[0];
        if (!candidate?.content?.parts?.[0]?.text) {
            return "Could not generate clarification prompt.";
        }
        
        return candidate.content.parts[0].text.trim();
    } catch (error) {
        console.error("Prompt API Error:", error.response ? error.response.data : error.message);
        return "Could not generate clarification prompt.";
    }
}

// ----------------------------------------------------
// 3. SUMMARIZER API (GEMINI)
// ----------------------------------------------------

export async function getMeetingSummary(fullTranscript, summaryLang = 'English') {
    if (!SUMMARIZER_KEY) {
        throw new Error("Summarizer API Key (Gemini) is missing.");
    }
    const model = 'gemini-2.5-flash:generateContent';
    const url = `${GEMINI_BASE_URL}${model}?key=${SUMMARIZER_KEY}`;
    const promptContent = `Summarize the following meeting transcript in ${summaryLang}. Focus on key decisions and action items. Transcript: ${fullTranscript}`;

    try {
        const response = await axios.post(url, {
            contents: [{ role: "user", parts: [{ text: promptContent }] }]
        });
        
        // Safe extraction with fallback
        const candidate = response.data?.candidates?.[0];
        if (!candidate?.content?.parts?.[0]?.text) {
            return "No summary generated. Try again.";
        }
        
        return candidate.content.parts[0].text.trim();
    } catch (error) {
        console.error("Summarizer API Error:", error.response ? error.response.data : error.message);
        return "Could not generate meeting summary.";
    }
}

// ----------------------------------------------------
// 4. AZURE SPEECH-TO-TEXT (Real-time Speech Recognition)
// ----------------------------------------------------

/**
 * Azure Speech-to-Text API for cloud-based speech recognition.
 * This provides more accurate transcription than browser's native Web Speech API.
 * @param {Blob} audioBlob The audio blob to transcribe
 * @param {string} language Language code (e.g., 'en-US', 'vi-VN', 'zh-CN')
 * @returns {Promise<string>} Transcribed text
 */
export async function azureSpeechToText(audioBlob, language = 'en-US') {
    if (!SPEECH_KEY || !SPEECH_REGION) {
        console.error("Missing Speech configuration:", { SPEECH_KEY, SPEECH_REGION });
        throw new Error("Azure Speech API configuration missing.");
    }

    const url = `https://${SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${language}`;

    try {
        const response = await axios.post(url, audioBlob, {
            headers: {
                'Ocp-Apim-Subscription-Key': SPEECH_KEY,
                'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
            }
        });
        
        return response.data.DisplayText || response.data.RecognitionStatus;
    } catch (error) {
        console.error("Azure Speech-to-Text Error:", error.response ? error.response.data : error.message);
        throw new Error("Speech recognition failed. Check API Key and audio format.");
    }
}

// ----------------------------------------------------
// 5. TEXT-TO-SPEECH (Browser Native)
// ----------------------------------------------------

/**
 * Speaks the provided text using the browser's native Web Speech API.
 * Automatically selects the best native voice for the target language.
 * @param {string} text The text to be spoken.
 * @param {string} lang The language code (e.g., 'zh-CN', 'ko-KR', 'ja-JP', 'fr-FR', 'en-US', 'vi-VN').
 */
export function speakText(text, lang, voiceURI) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;

        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            
            // Extract the language prefix (e.g., 'zh' from 'zh-CN', 'ko' from 'ko-KR')
            const langPrefix = lang.split('-')[0].toLowerCase();
            
            // Try to find the best matching voice:
            // 1. Exact match (e.g., 'zh-CN' matches 'zh-CN')
            // 2. Language prefix match (e.g., 'zh' matches 'zh-CN', 'zh-TW', etc.)
            // 3. Prefer local/native voices over network voices
            let selectedVoice = voiceURI ? voices.find(v => v.voiceURI === voiceURI) : null;
            if (!selectedVoice) {
                selectedVoice = voices.find(v => 
                v.lang.toLowerCase() === lang.toLowerCase() && v.localService
            ) || voices.find(v => 
                v.lang.toLowerCase() === lang.toLowerCase()
            ) || voices.find(v => 
                v.lang.toLowerCase().startsWith(langPrefix) && v.localService
            ) || voices.find(v => 
                v.lang.toLowerCase().startsWith(langPrefix)
            );
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                console.log(`🔊 Using voice: ${selectedVoice.name} (${selectedVoice.lang}) for text: "${text.substring(0, 30)}..."`);
            } else {
                console.warn(`⚠️ No native voice found for language: ${lang}. Using browser default.`);
            }

            window.speechSynthesis.speak(utterance);
        };
        
        // Ensure voices are loaded before trying to speak (crucial for most browsers)
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            setVoice();
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                setVoice();
                // Clear the listener after use to prevent multiple calls
                window.speechSynthesis.onvoiceschanged = null;
            };
        }

    } else {
        console.warn("Text-to-Speech not supported in this browser.");
    }
}
