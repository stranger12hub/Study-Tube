import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaClock, FaTrash, FaHistory } from 'react-icons/fa';

const SearchHistory = ({ query, onSelect, onSearch, visible, onClose }) => {
  const [history, setHistory] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadHistory();
    
    // Click outside to close
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem('studytube-search-history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading history:', e);
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

  const filteredHistory = query.trim()
    ? history.filter(item => 
        item.query.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : history.slice(0, 5);

  if (!visible || filteredHistory.length === 0) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 glass-effect 
                rounded-xl shadow-2xl border border-dark-800 z-[100]
                animate-slide-down overflow-hidden"
      style={{ maxWidth: '100%' }}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-dark-800/80 border-b border-dark-800 
                    flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaHistory className="text-accent-blue text-sm" />
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Recent Searches
          </span>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="text-xs text-red-400 hover:text-red-300 
                     transition-colors px-2 py-1 rounded hover:bg-dark-700"
          >
            Clear All
          </button>
        )}
      </div>

      {/* History Items */}
      <div className="max-h-64 overflow-y-auto bg-dark-900/95">
        {filteredHistory.map((item, index) => (
          <div
            key={`${item.query}-${index}`}
            onClick={() => {
              onSelect(item.query);
              onClose();
            }}
            className="group flex items-center justify-between px-4 py-3 
                     hover:bg-dark-800 cursor-pointer transition-all
                     border-b border-dark-800/50 last:border-0"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <FaSearch className="text-accent-blue text-sm flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-200 truncate">
                    {item.query}
                  </span>
                  {item.query.toLowerCase() === query.toLowerCase() && (
                    <span className="text-[10px] bg-accent-blue/20 text-accent-blue 
                                   px-2 py-0.5 rounded-full flex-shrink-0">
                      Current
                    </span>
                  )}
                </div>
                {item.timestamp && (
                  <div className="flex items-center gap-1 mt-1">
                    <FaClock className="text-[10px] text-gray-500" />
                    <span className="text-[10px] text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={(e) => removeFromHistory(e, item.query)}
              className="opacity-0 group-hover:opacity-100 text-gray-500 
                       hover:text-red-500 transition-all p-2 rounded-full
                       hover:bg-dark-700"
              title="Remove from history"
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer - Quick Search */}
      {query.trim() && !filteredHistory.some(item => 
        item.query.toLowerCase() === query.toLowerCase()
      ) && (
        <div
          onClick={() => {
            onSearch();
            onClose();
          }}
          className="px-4 py-3 bg-accent-blue/10 hover:bg-accent-blue/20 
                   cursor-pointer transition-colors border-t border-dark-800
                   flex items-center gap-2 group"
        >
          <FaSearch className="text-accent-blue text-sm" />
          <span className="text-sm text-gray-300">
            Search for "<span className="font-semibold text-accent-blue">{query}</span>"
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;