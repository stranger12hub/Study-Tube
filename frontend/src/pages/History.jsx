import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaClock, FaTrash, FaPlayCircle, FaEye, FaCalendar } from 'react-icons/fa';

const History = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load history from localStorage
  useEffect(() => {
    loadHistory();
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
  }, []);

  const loadHistory = () => {
    try {
      // Try new format first
      const watchHistoryData = localStorage.getItem('studytube-watch-history');
      if (watchHistoryData) {
        setWatchHistory(JSON.parse(watchHistoryData));
        return;
      }
      
      // Fallback to old format
      const saved = localStorage.getItem('studytube-history');
      if (saved) {
        setWatchHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading history:', e);
    }
  };

  const clearAllHistory = () => {
    if (window.confirm('Clear all watch history?')) {
      localStorage.removeItem('studytube-watch-history');
      localStorage.removeItem('studytube-history');
      localStorage.removeItem('studytube-video-progress');
      setWatchHistory([]);
    }
  };

  const removeFromHistory = (videoId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newHistory = watchHistory.filter(item => item.videoId !== videoId);
    localStorage.setItem('studytube-watch-history', JSON.stringify(newHistory));
    
    // Also remove progress
    const progressData = JSON.parse(localStorage.getItem('studytube-video-progress') || '{}');
    delete progressData[videoId];
    localStorage.setItem('studytube-video-progress', JSON.stringify(progressData));
    
    setWatchHistory(newHistory);
  };

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

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimestamp = (seconds) => {
    if (!seconds && seconds !== 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
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

      {/* History Content */}
      {watchHistory.length === 0 ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 
                          rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FaHistory className="text-accent-purple text-5xl opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-gray-300 mb-3">No watch history</h2>
            <p className="text-gray-500 mb-8">
              Videos you watch will appear here. Start watching to build your history!
            </p>
            <Link to="/search" className="btn-primary px-8 py-3 text-lg">
              Browse Videos
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Clear all button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={clearAllHistory}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 
                       rounded-lg hover:bg-red-500/20 transition-all duration-300
                       border border-red-500/20 hover:border-red-500/40"
            >
              <FaTrash /> Clear All History
            </button>
          </div>

          {/* History items grid */}
          {filteredHistory.length === 0 ? (
            <div className="glass-effect rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-lg">No videos found for this filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHistory.map((item, index) => (
                <div
                  key={`${item.videoId}-${index}`}
                  className="group bg-dark-900/50 rounded-xl overflow-hidden 
                           hover:bg-dark-900 transition-all duration-300 border border-dark-800
                           hover:border-accent-purple/50 hover:shadow-xl hover:shadow-accent-purple/5
                           hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <Link 
                    to={`/watch/${item.videoId}${item.timestamp ? `?t=${item.timestamp}` : ''}`}
                    className="block relative aspect-video overflow-hidden"
                  >
                    <img
                      src={item.thumbnail || 'https://via.placeholder.com/320x180?text=StudyTube'}
                      alt={item.title || 'Video thumbnail'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/320x180?text=StudyTube';
                      }}
                    />
                    {item.timestamp > 0 && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white 
                                    text-xs px-2 py-1 rounded-lg font-medium">
                        {formatTimestamp(item.timestamp)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                                  flex items-center justify-center transition-all duration-300
                                  backdrop-blur-sm">
                      <FaPlayCircle className="text-white text-5xl transform 
                                           group-hover:scale-110 transition-transform" />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="p-4">
                    <Link to={`/watch/${item.videoId}${item.timestamp ? `?t=${item.timestamp}` : ''}`}>
                      <h4 className="font-semibold text-base mb-2 hover:text-accent-purple 
                                   transition-colors line-clamp-2">
                        {item.title || 'Untitled Video'}
                      </h4>
                    </Link>
                    
                    <p className="text-sm text-gray-400 mb-3 line-clamp-1">
                      {item.channelTitle || 'Unknown Channel'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-accent-purple" />
                        <span>{timeAgo(item.lastWatched)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="text-accent-blue" />
                        <span>{item.timestamp ? 'In progress' : 'Not started'}</span>
                      </div>
                      <button
                        onClick={(e) => removeFromHistory(item.videoId, e)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove from history"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-600">
                      {formatDate(item.lastWatched)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;