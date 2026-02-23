import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaTrash, FaPlayCircle, FaClock, FaEye } from 'react-icons/fa';
import Button from '../components/Button';

const History = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load history from localStorage on mount
  useEffect(() => {
    loadHistory();
    
    // Listen for storage changes (updates from other tabs)
    window.addEventListener('storage', loadHistory);
    
    // Custom event for when video is watched
    window.addEventListener('videoWatched', loadHistory);
    
    return () => {
      window.removeEventListener('storage', loadHistory);
      window.removeEventListener('videoWatched', loadHistory);
    };
  }, []);

  const loadHistory = () => {
    try {
      // Try to get from watch history (new format)
      const watchHistoryData = localStorage.getItem('studytube-watch-history');
      
      if (watchHistoryData) {
        const parsed = JSON.parse(watchHistoryData);
        setWatchHistory(Array.isArray(parsed) ? parsed : []);
      } else {
        // Try old format
        const saved = localStorage.getItem('studytube-history');
        if (saved) {
          const parsed = JSON.parse(saved);
          setWatchHistory(Array.isArray(parsed) ? parsed : []);
        } else {
          setWatchHistory([]);
        }
      }
    } catch (e) {
      console.error('Error loading history:', e);
      setWatchHistory([]);
    }
  };

  // Clear all history
  const clearAllHistory = () => {
    if (window.confirm('Clear all watch history?')) {
      localStorage.removeItem('studytube-watch-history');
      localStorage.removeItem('studytube-history');
      localStorage.removeItem('studytube-video-progress');
      setWatchHistory([]);
      
      // Dispatch event
      window.dispatchEvent(new Event('videoWatched'));
    }
  };

  // Remove single item
  const removeFromHistory = (videoId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newHistory = watchHistory.filter(item => item.videoId !== videoId);
    localStorage.setItem('studytube-watch-history', JSON.stringify(newHistory));
    
    // Also remove progress for this video
    const progressData = JSON.parse(localStorage.getItem('studytube-video-progress') || '{}');
    delete progressData[videoId];
    localStorage.setItem('studytube-video-progress', JSON.stringify(progressData));
    
    setWatchHistory(newHistory);
    
    // Dispatch event
    window.dispatchEvent(new Event('videoWatched'));
  };

  // Format time ago
  const timeAgo = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
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
    <div className="max-w-5xl mx-auto">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Watch History</h1>
          <p className="text-gray-600 mt-1">
            {watchHistory.length} {watchHistory.length === 1 ? 'video' : 'videos'} watched
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Filter buttons */}
          <div className="flex gap-2">
            {['all', 'today', 'week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setFilter(period)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${filter === period 
                    ? 'bg-[#C47A4A] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {period === 'all' ? 'All' : period}
              </button>
            ))}
          </div>
          
          {/* Clear all button */}
          {watchHistory.length > 0 && (
            <Button variant="outline" onClick={clearAllHistory} size="sm">
              <FaTrash className="mr-2" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {watchHistory.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No watch history</h2>
          <p className="text-gray-600 mb-6">
            Videos you watch will appear here
          </p>
          <Link to="/search">
            <Button>Browse Videos</Button>
          </Link>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
          <p className="text-gray-600">No videos for this time period</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.videoId}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden
                       hover:shadow-md transition-all group"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                <Link
                  to={`/watch/${item.videoId}${item.timestamp ? `?t=${item.timestamp}` : ''}`}
                  className="sm:w-48 relative overflow-hidden"
                >
                  <img
                    src={item.thumbnail || 'https://via.placeholder.com/320x180?text=StudyTube'}
                    alt={item.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/320x180?text=StudyTube';
                    }}
                  />
                  
                  {/* Progress indicator */}
                  {item.timestamp > 0 && (
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white 
                                  text-xs px-2 py-1 rounded">
                      {formatTimestamp(item.timestamp)}
                    </div>
                  )}
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                                flex items-center justify-center transition-opacity">
                    <FaPlayCircle className="text-white text-3xl" />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 p-4">
                  <Link to={`/watch/${item.videoId}${item.timestamp ? `?t=${item.timestamp}` : ''}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-[#C47A4A] transition-colors line-clamp-2">
                      {item.title || 'Untitled Video'}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 mt-1">{item.channelTitle || 'Unknown Channel'}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-[#C47A4A]" />
                        {timeAgo(item.lastWatched)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-[#C47A4A]" />
                        {item.timestamp ? 'In progress' : 'Not started'}
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => removeFromHistory(item.videoId, e)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from history"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;