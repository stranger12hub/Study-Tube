import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHistory, FaTrash, FaPlayCircle } from 'react-icons/fa';
import Button from '../components/Button';

const History = () => {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('studytube-watch-history');
    if (saved) {
      setWatchHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('Clear all watch history?')) {
      localStorage.removeItem('studytube-watch-history');
      setWatchHistory([]);
    }
  };

  const removeItem = (videoId) => {
    const newHistory = watchHistory.filter(item => item.videoId !== videoId);
    localStorage.setItem('studytube-watch-history', JSON.stringify(newHistory));
    setWatchHistory(newHistory);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Watch History</h1>
        {watchHistory.length > 0 && (
          <Button variant="outline" onClick={clearHistory}>
            <FaTrash className="mr-2" /> Clear All
          </Button>
        )}
      </div>

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
      ) : (
        <div className="space-y-4">
          {watchHistory.map((item) => (
            <div
              key={item.videoId}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden
                       hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row">
                <Link
                  to={`/watch/${item.videoId}`}
                  className="sm:w-48 relative group"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                                flex items-center justify-center transition-opacity">
                    <FaPlayCircle className="text-white text-3xl" />
                  </div>
                </Link>

                <div className="flex-1 p-4">
                  <Link to={`/watch/${item.videoId}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-[#C47A4A] transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">{item.channelTitle}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      Watched {formatDate(item.lastWatched)}
                    </span>
                    <button
                      onClick={() => removeItem(item.videoId)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
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