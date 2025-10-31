import React, { useState } from 'react';
import FloatingActionButton from './components/FloatingActionButton';

// Define unique brand colors 
const COLORS = {
  BACKGROUND: '#121212', // Dark background for contrast/readability
  PRIMARY: '#007bff', // Blue
  ACCENT: '#ff9800', // Orange
  TEXT_LIGHT: '#ffffff', // White text on dark background
};

function AppSimple() {
  const [activeFeature, setActiveFeature] = useState(null); 

  return (
    <div className="relative min-h-screen p-8 font-inter antialiased" style={{ backgroundColor: COLORS.BACKGROUND }}>
        
        {/* Test Panel */}
        {activeFeature && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-2xl z-50 min-w-[350px] max-w-sm border border-gray-200">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <h2 className="text-lg font-bold" style={{ color: COLORS.PRIMARY }}>
                        Test Panel - {activeFeature}
                    </h2>
                    <button 
                        onClick={() => setActiveFeature(null)} 
                        className="text-gray-500 hover:text-gray-900 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                <div className="pt-3">
                    <p>Feature {activeFeature} is working!</p>
                </div>
            </div>
        )}

        {/* Floating Action Button */}
        <FloatingActionButton setActiveFeature={setActiveFeature} />
    </div>
  );
}

export default AppSimple;