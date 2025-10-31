import React from 'react';

function TestMinimal() {
  return (
    <div style={{ 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh', 
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
        🌍 Goglobal Test
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        React is working! ✅
      </p>
      <div style={{ 
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '25px',
        cursor: 'pointer'
      }}>
        Test Button
      </div>
    </div>
  );
}

export default TestMinimal;