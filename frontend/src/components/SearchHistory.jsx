import React, { useState, useEffect } from 'react';
import { FaSearch, FaHistory, FaTrash, FaClock } from 'react-icons/fa';

const SearchHistory = ({ onSearchSelect }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('studytube-search-history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Save search to history
  const saveSearch = (query) => {
    if (!query.trim()) return;

    const newHistory = [
      {
        query: query.trim(),
        timestamp: new Date().toISOString()
      },
      ...searchHistory.filter(item => item.query !== query) // Remove duplicates
    ].slice(0, 10); // Keep only last 10 searches

    localStorage.setItem('studytube-search-history', JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  // Clear all search history
  const clearHistory = () => {
    localStorage.removeItem('studytube-search-history');
    setSearchHistory([]);
  };

  // Remove single search
  const removeSearch = (queryToRemove, e) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(item => item.query !== queryToRemove);
    localStorage.setItem('studytube-search-history', JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  // Format time ago
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!showHistory) {
    return (
      <button
        onClick={() => setShowHistory(true)}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 
                   text-gray-400 hover:text-accent-blue transition-colors"
        title="Search History"
      >
        <FaHistory className="text-xl" />
      </button>
    );
  }

  return (
    <div className="absolute right-16 top-12 w-72 glass-effect rounded-xl 
                    shadow-2xl border border-dark-800 z-50 overflow-hidden
                    animate-slide-down">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-blue to-accent-purple p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <FaHistory />
            Recent Searches
          </h3>
          <button
            onClick={() => setShowHistory(false)}
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Search History List */}
      <div className="max-h-64 overflow-y-auto">
        {searchHistory.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <FaHistory className="text-3xl mx-auto mb-2 opacity-50" />
            <p className="text-sm">No search history yet</p>
          </div>
        ) : (
          <>
            {searchHistory.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  onSearchSelect(item.query);
                  setShowHistory(false);
                }}
                className="flex items-center justify-between p-3 hover:bg-dark-800 
                         cursor-pointer transition-colors group border-b border-dark-800/50"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FaSearch className="text-accent-blue text-sm flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.query}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <FaClock className="text-xs" />
                      {timeAgo(item.timestamp)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => removeSearch(item.query, e)}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 
                           hover:text-red-500 transition-all p-1"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}

            {/* Clear all button */}
            {searchHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="w-full p-2 text-sm text-red-400 hover:text-red-300 
                         hover:bg-dark-800 transition-colors flex items-center 
                         justify-center gap-2 border-t border-dark-800"
              >
                <FaTrash size={12} /> Clear All History
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;