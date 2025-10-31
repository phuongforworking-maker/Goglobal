// src/components/LiveSpeechInput.jsx

import React, { useState, useEffect } from 'react';

// Define the Speech Recognition object based on browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/**
 * LiveSpeechInput component handles real-time voice capture and transcription.
 * @param {function} onTranscript - Callback function to receive the transcribed text.
 */
const LiveSpeechInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [liveText, setLiveText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }

    // Create recognizer inside useEffect for better React safety
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the live text shown to the user (interim)
      setLiveText(interimTranscript);

      // Send the final, complete phrase to the parent component
      if (finalTranscript.trim().length > 0) {
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // Start/stop recognition based on isListening state
    if (isListening) {
      try {
        recognition.start();
      } catch (err) {
        console.error('Recognition start error:', err);
        setError("Microphone could not start. Check browser permissions.");
        setIsListening(false);
      }
    }

    // Cleanup function
    return () => {
      recognition.stop();
    };
  }, [onTranscript, isListening]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setError(null);
      // Add slight delay to prevent start errors in Chrome
      setTimeout(() => {
        setIsListening(true);
      }, 200);
    }
  };

  return (
    <div style={{ padding: '15px', border: '1px dashed #6c757d', borderRadius: '5px', marginTop: '20px' }}>
      <p style={{ fontWeight: 'bold' }}>Live Speech Input</p>
      
      {/* Improved UI with glowing circle button */}
      <button 
        onClick={toggleListening}
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: isListening ? "#dc3545" : "#28a745",
          border: "none",
          boxShadow: isListening ? "0 0 12px rgba(220, 53, 69, 0.6)" : "0 0 8px rgba(0,0,0,0.3)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          color: "white",
          fontWeight: "bold",
          fontSize: "12px"
        }}
        title={isListening ? "Stop Listening" : "Start Microphone"}
      >
        {isListening ? 'STOP' : 'START'}
      </button>
      
      <p style={{ marginTop: '10px' }}>
        **Current Speaker Text (Live):** {liveText}
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Basic button style (ensure this is defined in App.jsx or here)
const buttonStyle = {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
}

export default LiveSpeechInput;
