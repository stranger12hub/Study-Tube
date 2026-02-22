import React from 'react';
import { FaYoutube } from 'react-icons/fa';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark-950 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          {/* Animated logo */}
          <div className="w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-teal to-accent-cyan 
                          rounded-3xl animate-pulse-glow"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-teal to-accent-cyan 
                          rounded-3xl animate-ping opacity-75"></div>
            <div className="relative w-24 h-24 bg-gradient-to-r from-accent-teal to-accent-cyan 
                          rounded-3xl flex items-center justify-center">
              <FaYoutube className="text-dark-950 text-5xl animate-pulse" />
            </div>
          </div>
          
          {/* Loading text with dots animation */}
          <h2 className="text-2xl font-bold text-gradient mb-4">StudyTube</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-accent-teal rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-accent-cyan rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-accent-indigo rounded-full animate-bounce"></div>
          </div>
          <p className="text-dark-400 mt-4 animate-pulse">Loading amazing content...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;