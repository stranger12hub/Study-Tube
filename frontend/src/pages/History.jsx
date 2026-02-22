import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHistory, 
  FaClock, 
  FaTrash, 
  FaPlayCircle, 
  FaEye, 
  FaCalendar,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaYoutube 
} from 'react-icons/fa';

const History = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);

  // Load history from localStorage
  useEffect(() => {
    loadHistory();
    
    // Listen for storage changes (when video is watched in another tab)
    const handleStorageChange = () => {
      loadHistory();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for when video is watched
    window.addEventListener('videoWatched', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('videoWatched', handleStorageChange);
    };
  }, []);

  const loadHistory = () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Save video to history (called from Watch component) - REMOVED EXPORT KEYWORD
  const saveToHistory = (videoData) => {
    try {
      const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
      
      const newEntry = {
        videoId: videoData.videoId,
        title: videoData.title || 'Untitled Video',
        thumbnail: videoData.thumbnail || 'https://via.placeholder.com/320x180?text=StudyTube',
        channelTitle: videoData.channelTitle || 'Unknown Channel',
        timestamp: videoData.timestamp || 0,
        duration: videoData.duration || 0,
        lastWatched: new Date().toISOString()
      };
      
      // Remove duplicate if exists
      const filtered = history.filter(item => item.videoId !== videoData.videoId);
      
      // Add new entry at beginning
      filtered.unshift(newEntry);
      
      // Keep only last 50 videos
      const trimmed = filtered.slice(0, 50);
      
      localStorage.setItem('studytube-watch-history', JSON.stringify(trimmed));
      
      // Dispatch event to notify history page
      window.dispatchEvent(new Event('videoWatched'));
      
      return true;
    } catch (e) {
      console.error('Error saving to history:', e);
      return false;
    }
  };

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all watch history? This cannot be undone.')) {
      localStorage.removeItem('studytube-watch-history');
      localStorage.removeItem('studytube-history');
      localStorage.removeItem('studytube-video-progress');
      setWatchHistory([]);
      
      // Dispatch event
      window.dispatchEvent(new Event('videoWatched'));
    }
  };

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

  const formatTimeAgo = (dateString) => {
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

  const formatTimestamp = (seconds) => {
    if (!seconds && seconds !== 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFilteredHistory = () => {
    let filtered = [...watchHistory];

    // Apply time filter
    const now = new Date();
    filtered = filtered.filter(item => {
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

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.lastWatched || 0);
      const dateB = new Date(b.lastWatched || 0);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  };

  const filteredHistory = getFilteredHistory();

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="glass-effect rounded-2xl p-8 mb-6">
          <div className="h-8 bg-dark-800 rounded-full w-64 mb-4 shimmer"></div>
          <div className="h-4 bg-dark-800 rounded-full w-96 shimmer"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <div className="aspect-video bg-dark-800 shimmer"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-dark-800 rounded-full w-3/4 shimmer"></div>
                <div className="h-3 bg-dark-800 rounded-full w-1/2 shimmer"></div>
                <div className="h-3 bg-dark-800 rounded-full w-2/3 shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with Stats */}
      <div className="glass-effect rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
              <FaHistory className="text-elegant-gold" />
              <span className="text-gradient">Watch</span> History
            </h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-elegant-cream/70">
                <span className="text-elegant-gold font-semibold text-lg">{watchHistory.length}</span> total videos
              </span>
              {watchHistory.length > 0 && (
                <>
                  <span className="text-elegant-cream/70">•</span>
                  <span className="text-elegant-cream/70">
                    <span className="text-elegant-bronze font-semibold">
                      {new Set(watchHistory.map(item => item.channelTitle)).size}
                    </span> channels
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            {/* Filter buttons */}
            <div className="flex bg-dark-800/50 rounded-xl p-1">
              {['all', 'today', 'week', 'month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setFilter(period)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 text-sm
                    ${filter === period 
                      ? 'bg-gradient-to-r from-elegant-gold to-elegant-bronze text-dark-950 font-medium' 
                      : 'text-elegant-cream/70 hover:text-elegant-gold'}`}
                >
                  {period === 'all' ? 'All' : period}
                </button>
              ))}
            </div>

            {/* Sort button */}
            <button
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="px-4 py-2 bg-dark-800/50 rounded-xl text-elegant-cream/70 
                       hover:text-elegant-gold transition-all duration-300
                       flex items-center gap-2"
              title={sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
            >
              {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
            </button>

            {/* Clear all button */}
            {watchHistory.length > 0 && (
              <button
                onClick={clearAllHistory}
                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl
                         hover:bg-red-500/20 transition-all duration-300
                         flex items-center gap-2"
              >
                <FaTrash /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* History List */}
      {watchHistory.length === 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-elegant-gold/20 
                          to-elegant-bronze/20 rounded-3xl flex items-center justify-center
                          animate-float">
              <FaHistory className="text-elegant-gold text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-elegant-cream mb-3">Your history is empty</h2>
            <p className="text-elegant-cream/60 mb-8">
              Videos you watch will appear here. Start exploring educational content!
            </p>
            <Link to="/search" className="btn-primary">
              Browse Videos
            </Link>
          </div>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FaFilter className="text-4xl text-elegant-gold/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-elegant-cream mb-2">No videos for this filter</h3>
          <p className="text-elegant-cream/60">Try a different time period</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item, index) => (
            <div
              key={`${item.videoId}-${index}`}
              className="group premium-card hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Thumbnail */}
                <Link 
                  to={`/watch/${item.videoId}${item.timestamp ? `?t=${Math.floor(item.timestamp)}` : ''}`}
                  className="sm:w-64 relative overflow-hidden rounded-xl"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-40 sm:h-28 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/320x180?text=StudyTube';
                    }}
                  />
                  
                  {/* Progress indicator */}
                  {item.timestamp > 0 && item.duration > 0 && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-800">
                        <div 
                          className="h-full bg-gradient-to-r from-elegant-gold to-elegant-bronze"
                          style={{ width: `${Math.min((item.timestamp / item.duration) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-dark-950/90 text-elegant-gold 
                                    text-xs px-2 py-1 rounded-lg border border-elegant-gold/30
                                    backdrop-blur-sm">
                        {formatTimestamp(item.timestamp)}
                      </div>
                    </>
                  )}

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 
                                flex items-center justify-center transition-all duration-300
                                backdrop-blur-sm">
                    <FaPlayCircle className="text-elegant-gold text-5xl transform 
                                         group-hover:scale-110 transition-transform" />
                  </div>
                </Link>

                {/* Video details */}
                <div className="flex-1 p-4">
                  <Link to={`/watch/${item.videoId}${item.timestamp ? `?t=${Math.floor(item.timestamp)}` : ''}`}>
                    <h4 className="font-semibold text-lg mb-2 hover:text-elegant-gold 
                                 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </Link>
                  
                  <p className="text-sm text-elegant-cream/60 mb-3 flex items-center gap-2">
                    <span className="truncate">{item.channelTitle}</span>
                    <span className="w-1 h-1 bg-elegant-gold/30 rounded-full"></span>
                    <span className="text-elegant-gold text-xs gold-badge">
                      {item.timestamp ? `${Math.floor(item.timestamp / 60)}:${(item.timestamp % 60).toString().padStart(2, '0')} watched` : 'Not started'}
                    </span>
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-elegant-cream/50">
                    <span className="flex items-center gap-1">
                      <FaClock className="text-elegant-gold" />
                      {formatTimeAgo(item.lastWatched)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye className="text-elegant-bronze" />
                      {item.timestamp ? 'In progress' : 'Not watched'}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-elegant-copper" />
                      {new Date(item.lastWatched).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => removeFromHistory(item.videoId, e)}
                  className="absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto
                           p-3 text-elegant-cream/40 hover:text-red-500 transition-colors
                           hover:bg-dark-800 rounded-xl"
                  title="Remove from history"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;