import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaClock, FaTrash, FaPlayCircle, FaEye, FaCalendar } from 'react-icons/fa';

const History = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load history from localStorage
  useEffect(() => {
    loadHistory();
    
    // Listen for storage changes (if multiple tabs)
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
  }, []);

  const loadHistory = () => {
    const saved = localStorage.getItem('studytube-history');
    if (saved) {
      try {
        setWatchHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  };

  // Clear all history
  const clearAllHistory = () => {
    if (window.confirm('Clear all watch history?')) {
      localStorage.removeItem('studytube-history');
      setWatchHistory([]);
    }
  };

  // Remove single item
  const removeFromHistory = (videoId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const newHistory = watchHistory.filter(item => item.videoId !== videoId);
    localStorage.setItem('studytube-history', JSON.stringify(newHistory));
    setWatchHistory(newHistory);
  };

  // Format time ago
  const timeAgo = (dateString) => {
    if (!dateString) return 'unknown';
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format timestamp
  const formatTimestamp = (seconds) => {
    if (!seconds && seconds !== 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter history
  const getFilteredHistory = () => {
    const now = new Date();
    return watchHistory.filter(item => {
      if (!item.lastWatched) return false;
      const itemDate = new Date(item.lastWatched);
      const diffDays = Math.floor((now - itemDate) / (1000 * 60 * 60 * 24));
      
      switch(filter) {
        case 'today': return diffDays === 0;
        case 'week': return diffDays < 7;
        case 'month': return diffDays < 30;
        default: return true;
      }
    });
  };

  const filteredHistory = getFilteredHistory();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
              <FaHistory className="text-accent-purple" />
              <span className="text-gradient">Watch</span> History
            </h1>
            <p className="text-gray-400">
              {watchHistory.length} {watchHistory.length === 1 ? 'video' : 'videos'} watched
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {['all', 'today', 'week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setFilter(period)}
                className={`px-4 py-2 rounded-lg capitalize transition-all duration-300
                  ${filter === period 
                    ? 'bg-accent-purple text-white' 
                    : 'bg-dark-800 text-gray-400 hover:bg-dark-700'}`}
              >
                {period === 'all' ? 'All Time' : period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* History List */}
      {watchHistory.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-dark-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FaHistory className="text-gray-500 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-3">No watch history</h2>
            <p className="text-gray-500 max-w-md">
              Videos you watch will appear here. Start watching to build your history!
            </p>
            <Link to="/search" className="btn-primary mt-6">
              Browse Videos
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Clear all button */}
          <div className="flex justify-end">
            <button
              onClick={clearAllHistory}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 
                       rounded-lg hover:bg-red-500/20 transition-all duration-300"
            >
              <FaTrash /> Clear All History
            </button>
          </div>

          {/* History items */}
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 glass-effect rounded-2xl">
              <p className="text-gray-400">No videos found for this filter</p>
            </div>
          ) : (
            filteredHistory.map((item, index) => (
              <div
                key={item.videoId + index}
                className="group relative bg-dark-900/50 rounded-xl overflow-hidden 
                         hover:bg-dark-900 transition-all duration-300 border border-dark-800
                         hover:border-accent-purple/50"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  <Link 
                    to={`/watch/${item.videoId}${item.timestamp ? `?t=${item.timestamp}` : ''}`}
                    className="sm:w-64 relative group/thumb"
                  >
                    <img
                      src={item.thumbnail || 'https://via.placeholder.com/320x180?text=StudyTube'}
                      alt={item.title || 'Video thumbnail'}
                      className="w-full h-40 sm:h-28 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/320x180?text=StudyTube';
                      }}
                    />
                    {item.timestamp > 0 && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white 
                                    text-xs px-2 py-1 rounded">
                        {formatTimestamp(item.timestamp)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 
                                  flex items-center justify-center transition-opacity">
                      <FaPlayCircle className="text-white text-4xl" />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 p-4">
                    <Link to={`/watch/${item.videoId}${item.timestamp ? `?t=${item.timestamp}` : ''}`}>
                      <h4 className="font-semibold text-lg mb-1 hover:text-accent-purple 
                                   transition-colors line-clamp-2">
                        {item.title || 'Untitled Video'}
                      </h4>
                    </Link>
                    <p className="text-sm text-gray-400 mb-2">{item.channelTitle || 'Unknown Channel'}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-accent-purple" />
                        {timeAgo(item.lastWatched)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-accent-blue" />
                        {item.timestamp ? `Watched ${formatTimestamp(item.timestamp)}` : 'Not started'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-accent-green" />
                        {formatDate(item.lastWatched)}
                      </span>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={(e) => removeFromHistory(item.videoId, e)}
                    className="absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto
                             p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove from history"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default History;