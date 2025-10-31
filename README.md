# Goglobal

Goglobal transforms Google Meet &amp; WebRTC with real-time AI that speaks your language. It clarifies meaning, adapts to domain glossaries, and learns from peer feedback for perfect context.

**Testing Instructions (For the Judges)**

Setup: Configure My Experience

1. Launch Agent: Click the floating Globe Button in the corner.

2. Go to Setup: Click the Voice Icon (Microphone/Headset).

3. Set Primary Language: In the Target Language dropdown, select a non-English language (e.g., Spanish).

4. Enable Dubbing: Check the box next to Audio Dubbing (Dub). (The voice selector should appear).

5. Enable Subtitles: Check the box next to Subtitle Display (Sub).

## Test 1: Automatic Detection & Dual Output

_This proves the system can detect an unknown language and deliver both audio and text output to my chosen language (Spanish)._ 

1. Start the Microphone inside the panel.

2. Speak a foreign phrase (simulating another participant): Say clearly: "Hello, what is the final decision?" (English)

Expected Result: The app displays Detected: English. The Spanish translation, "Hola, ¿cuál es la decisión final?", appears in the subtitle bar AND is spoken aloud simultaneously.

## Test 2: Transcript Recording (No Self-Translation)

_This proves the microphone is only listening to others and saving the transcript, but not translating my own language back to me._

1. With the mic still ON, say in English: "I am ready to stop the meeting now."

Expected Result: The phrase is transcribed into the full conversation log (for summarization), but no Spanish translation is generated or spoken.

## Test 3: Post-Meeting Summarization

1. Close Setup Panel: Click the X button to close the setup panel.

2. Open Summarizer: Click the Note Icon (Paper/File icon) in the FAB menu.

3. Click the Generate Summary button.

Expected Result: A concise, AI-generated summary of the conversation history (including the Spanish translations and English transcripts) appears, written entirely in Spanish.
=======
