import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaClock, FaTrash, FaPlayCircle } from 'react-icons/fa';

const VideoHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('studytube-history');
    if (saved) {
      setWatchHistory(JSON.parse(saved));
    }
  }, []);

  // Save progress when video is paused
  const saveProgress = (videoId, title, thumbnail, channelTitle, timestamp) => {
    const history = JSON.parse(localStorage.getItem('studytube-history') || '[]');
    
    // Check if video already in history
    const existingIndex = history.findIndex(item => item.videoId === videoId);
    
    const newEntry = {
      videoId,
      title,
      thumbnail,
      channelTitle,
      timestamp,
      lastWatched: new Date().toISOString()
    };
    
    if (existingIndex !== -1) {
      // Update existing entry
      history[existingIndex] = newEntry;
    } else {
      // Add new entry
      history.unshift(newEntry);
      // Keep only last 50 videos
      if (history.length > 50) history.pop();
    }
    
    localStorage.setItem('studytube-history', JSON.stringify(history));
    setWatchHistory(history);
  };

  // Clear history
  const clearHistory = () => {
    localStorage.removeItem('studytube-history');
    setWatchHistory([]);
  };

  // Remove single item
  const removeItem = (videoId) => {
    const newHistory = watchHistory.filter(item => item.videoId !== videoId);
    localStorage.setItem('studytube-history', JSON.stringify(newHistory));
    setWatchHistory(newHistory);
  };

  // Format time ago
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Format timestamp (seconds to MM:SS)
  const formatTimestamp = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showHistory) {
    return (
      <button
        onClick={() => setShowHistory(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-purple-500 to-pink-500 
                   text-white p-4 rounded-full shadow-lg hover:shadow-xl 
                   transform hover:scale-110 transition-all duration-300 z-50
                   animate-bounce-slow"
        title="Watch History"
      >
        <FaHistory className="text-2xl" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-80 glass-effect rounded-2xl shadow-2xl 
                    border border-dark-800 z-50 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <FaHistory />
            Watch History
          </h3>
          <button
            onClick={() => setShowHistory(false)}
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="max-h-96 overflow-y-auto p-2">
        {watchHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FaHistory className="text-4xl mx-auto mb-2 opacity-50" />
            <p>No watch history yet</p>
          </div>
        ) : (
          <>
            <button
              onClick={clearHistory}
              className="w-full mb-2 py-2 text-sm text-red-400 hover:text-red-300 
                       hover:bg-dark-800 rounded-lg transition-colors flex items-center 
                       justify-center gap-2"
            >
              <FaTrash /> Clear History
            </button>
            
            {watchHistory.map((item) => (
              <div
                key={item.videoId}
                className="relative group mb-2 p-2 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-all"
              >
                <Link
                  to={`/watch/${item.videoId}?t=${item.timestamp}`}
                  className="flex gap-2"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-12 flex-shrink-0">
                    <img
                      src={item.thumbnail || 'https://via.placeholder.com/80x45'}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                                  flex items-center justify-center transition-opacity">
                      <FaPlayCircle className="text-white text-lg" />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400 truncate">{item.channelTitle}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <FaClock className="text-purple-400" />
                      <span className="text-gray-400">{timeAgo(item.lastWatched)}</span>
                      {item.timestamp > 0 && (
                        <span className="text-green-400 ml-auto">
                          {formatTimestamp(item.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                
                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.videoId)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 
                           text-gray-400 hover:text-red-400 transition-all"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoHistory;