import React, { useState, useEffect } from 'react';

// Simple FloatingActionButton component
const FloatingActionButton = ({ setActiveFeature }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setIsOpen(false);
  };

  return (
    <div 
      style={{ 
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000
      }}
    >
      {/* Utility buttons */}
      {isOpen && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          marginBottom: '12px',
          alignItems: 'center'
        }}>
          <button
            onClick={() => handleFeatureClick('voice')}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            🎤
          </button>
          <button
            onClick={() => handleFeatureClick('settings')}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ⚙️
          </button>
          <button
            onClick={() => handleFeatureClick('summary')}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            📝
          </button>
        </div>
      )}

      {/* Main globe button */}
      <button
        onClick={toggleMenu}
        style={{
          width: '66px',
          height: '66px',
          borderRadius: '50%',
          backgroundColor: '#1e90ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        {isOpen ? '✕' : '🌍'}
      </button>
    </div>
  );
};

// Simple panels
const VoicePanel = () => (
  <div style={{ padding: '20px' }}>
    <h3>🎤 Voice Translation</h3>
    <p>Click the microphone to start voice translation.</p>
    <button style={{ 
      padding: '10px 20px', 
      backgroundColor: '#007bff', 
      color: 'white', 
      border: 'none', 
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      Start Recording
    </button>
  </div>
);

const SettingsPanel = () => (
  <div style={{ padding: '20px' }}>
    <h3>⚙️ Settings</h3>
    <div style={{ marginTop: '10px' }}>
      <label>Target Language:</label>
      <select style={{ marginLeft: '10px', padding: '5px' }}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="ja">Japanese</option>
      </select>
    </div>
    <div style={{ marginTop: '10px' }}>
      <label>
        <input type="checkbox" /> Enable Subtitles
      </label>
    </div>
  </div>
);

const SummaryPanel = () => (
  <div style={{ padding: '20px' }}>
    <h3>📝 Meeting Summary</h3>
    <p>Generate a summary of your conversation.</p>
    <button style={{ 
      padding: '10px 20px', 
      backgroundColor: '#28a745', 
      color: 'white', 
      border: 'none', 
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      Generate Summary
    </button>
  </div>
);

// Main App component
function App() {
  const [activeFeature, setActiveFeature] = useState(null);

  const renderPanel = () => {
    switch (activeFeature) {
      case 'voice':
        return <VoicePanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'summary':
        return <SummaryPanel />;
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>🌍 Goglobal</h1>
        <p style={{ margin: '5px 0 0 0', color: '#666' }}>
          AI-powered translation assistant
        </p>
      </div>

      {/* Panel */}
      {activeFeature && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          zIndex: 999,
          minWidth: '350px',
          maxWidth: '500px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '15px 20px',
            borderBottom: '1px solid #eee'
          }}>
            <h2 style={{ margin: 0, color: '#333' }}>
              {activeFeature === 'voice' && '🎤 Voice'}
              {activeFeature === 'settings' && '⚙️ Settings'}
              {activeFeature === 'summary' && '📝 Summary'}
            </h2>
            <button
              onClick={() => setActiveFeature(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#999'
              }}
            >
              ✕
            </button>
          </div>
          {renderPanel()}
        </div>
      )}

      {/* Floating Action Button */}
      <FloatingActionButton setActiveFeature={setActiveFeature} />

      {/* Main content area */}
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>
          Welcome to Goglobal! 🚀
        </h2>
        <p style={{ color: '#666', fontSize: '18px', lineHeight: '1.6' }}>
          Click the floating globe button in the bottom-right corner to get started with:
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px', 
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎤</div>
            <h3 style={{ color: '#333', margin: '0 0 10px 0' }}>Voice Translation</h3>
            <p style={{ color: '#666', margin: 0 }}>Real-time speech translation</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚙️</div>
            <h3 style={{ color: '#333', margin: '0 0 10px 0' }}>Settings</h3>
            <p style={{ color: '#666', margin: 0 }}>Configure languages & preferences</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📝</div>
            <h3 style={{ color: '#333', margin: '0 0 10px 0' }}>Summary</h3>
            <p style={{ color: '#666', margin: 0 }}>Generate meeting summaries</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;