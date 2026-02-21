import React, { useState, useEffect } from 'react';
import { FaSearch, FaClock, FaTrash } from 'react-icons/fa';

const SearchHistory = ({ query, onSelect, onSearch }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = localStorage.getItem('studytube-search-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  };

  const removeFromHistory = (e, queryToRemove) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newHistory = history.filter(item => item.query !== queryToRemove);
    localStorage.setItem('studytube-search-history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const clearAllHistory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Clear all search history?')) {
      localStorage.removeItem('studytube-search-history');
      setHistory([]);
    }
  };

  const filteredHistory = query
    ? history.filter(item => 
        item.query.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : history.slice(0, 5);

  if (filteredHistory.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass-effect 
                    rounded-xl shadow-2xl border border-dark-800 z-50
                    animate-slide-down overflow-hidden">
      
      <div className="px-4 py-2 bg-dark-800/50 border-b border-dark-800 
                    flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400">
          Recent Searches
        </span>
        {history.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Clear All
          </button>
        )}
      </div>

      {filteredHistory.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelect(item.query)}
          className="flex items-center justify-between px-4 py-3 
                   hover:bg-dark-800 cursor-pointer transition-colors
                   group border-b border-dark-800/50 last:border-0"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <FaSearch className="text-accent-blue text-sm flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {item.query}
              </div>
              {item.timestamp && (
                <div className="flex items-center gap-1 mt-1">
                  <FaClock className="text-xs text-gray-500" />
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={(e) => removeFromHistory(e, item.query)}
            className="opacity-0 group-hover:opacity-100 text-gray-500 
                     hover:text-red-500 transition-all p-2"
          >
            <FaTrash size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;