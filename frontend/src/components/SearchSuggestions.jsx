import React, { useState, useEffect } from 'react';
import { FaSearch, FaHistory, FaClock, FaTrash } from 'react-icons/fa';

const SearchSuggestions = ({ query, onSelect, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load search history from localStorage
  const getSearchHistory = () => {
    const saved = localStorage.getItem('studytube-search-history');
    return saved ? JSON.parse(saved) : [];
  };

  // Update suggestions when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const history = getSearchHistory();
      
      // Filter history based on query
      const filtered = history
        .filter(item => 
          item.query.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // Show top 5 matches
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      // Show recent searches when query is empty
      const history = getSearchHistory();
      setSuggestions(history.slice(0, 5));
      setShowSuggestions(history.length > 0);
    }
  }, [query]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion.query);
    setShowSuggestions(false);
  };

  // Remove single search from history
  const removeFromHistory = (e, queryToRemove) => {
    e.preventDefault();
    e.stopPropagation();
    
    const history = getSearchHistory();
    const newHistory = history.filter(item => item.query !== queryToRemove);
    localStorage.setItem('studytube-search-history', JSON.stringify(newHistory));
    
    // Update suggestions
    setSuggestions(prev => prev.filter(item => item.query !== queryToRemove));
  };

  // Clear all history
  const clearAllHistory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Clear all search history?')) {
      localStorage.removeItem('studytube-search-history');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Format time ago
  const timeAgo = (dateString) => {
    if (!dateString) return '';
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

  if (!showSuggestions || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass-effect 
                    rounded-xl shadow-2xl border border-dark-800 z-50
                    animate-slide-down overflow-hidden">
      
      {/* Header */}
      <div className="px-4 py-2 bg-dark-800/50 border-b border-dark-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
            <FaHistory /> Recent Searches
          </span>
          <button
            onClick={clearAllHistory}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Suggestions list */}
      <div className="max-h-60 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="flex items-center justify-between px-4 py-3 
                     hover:bg-dark-800 cursor-pointer transition-colors
                     group border-b border-dark-800/50 last:border-0"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <FaSearch className="text-accent-blue text-sm flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {suggestion.query}
                  </span>
                  {suggestion.query.toLowerCase() === query.toLowerCase() && (
                    <span className="text-xs bg-accent-blue/20 text-accent-blue 
                                   px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <FaClock className="text-xs" />
                    {timeAgo(suggestion.timestamp)}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={(e) => removeFromHistory(e, suggestion.query)}
              className="opacity-0 group-hover:opacity-100 text-gray-500 
                       hover:text-red-500 transition-all p-2"
              title="Remove from history"
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer with search action */}
      {query && !suggestions.some(s => s.query.toLowerCase() === query.toLowerCase()) && (
        <div
          onClick={() => onSearch()}
          className="px-4 py-3 bg-accent-blue/10 hover:bg-accent-blue/20 
                   cursor-pointer transition-colors border-t border-dark-800
                   flex items-center gap-2"
        >
          <FaSearch className="text-accent-blue" />
          <span className="text-sm">
            Search for "<span className="font-semibold">{query}</span>"
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;