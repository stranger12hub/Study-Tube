import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import SkeletonCard from '../components/SkeletonCard';
import { FaSearch, FaFilter, FaTimes, FaCheckCircle } from 'react-icons/fa';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Configure axios
axios.defaults.baseURL = API_URL;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [stats, setStats] = useState({ total: 0, channels: [] });

  useEffect(() => {
    if (!query) return;

    const searchVideos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Searching for:', query);
        console.log('Using API URL:', API_URL);
        
        const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
        console.log('Response:', response.data);
        
        setVideos(response.data.results || []);
        setFromCache(response.data.fromCache || false);
        
        // Calculate stats
        const results = response.data.results || [];
        const channels = [...new Set(results.map(v => v.channelTitle))];
        setStats({
          total: results.length,
          channels: channels
        });
      } catch (err) {
        console.error('Search error:', err);
        setError(err.response?.data?.message || 'Failed to search videos');
      } finally {
        setLoading(false);
      }
    };

    searchVideos();
  }, [query]);

  if (!query) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-accent-blue to-accent-purple 
                        rounded-3xl flex items-center justify-center mx-auto mb-6
                        animate-pulse-slow">
            <FaSearch className="text-white text-4xl" />
          </div>
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-gradient">Search</span> Videos
          </h2>
          <p className="text-gray-400 text-lg max-w-md">
            Try searching for: vivek maths, ram maths, 12th maths, public exam 2026
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="glass-effect rounded-2xl p-6 animate-pulse">
          <div className="h-8 bg-dark-800 rounded-full w-64 mb-2"></div>
          <div className="h-4 bg-dark-800 rounded-full w-96"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FaTimes className="text-red-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-gray-500 mb-4">API URL: {API_URL}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Results for "{query}"
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-gray-400">
                Found <span className="text-accent-blue font-semibold">{stats.total}</span> videos
              </span>
              {stats.channels.length > 0 && (
                <span className="text-gray-400">
                  from <span className="text-accent-purple font-semibold">{stats.channels.length}</span> channels
                </span>
              )}
              {fromCache && (
                <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-xs font-medium">Cached results</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {videos.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-dark-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-3">No videos found</h2>
            <p className="text-gray-500 max-w-md">
              We couldn't find any videos matching "{query}" in our curated channels.
            </p>
            <p className="text-gray-600 mt-4">Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {['vivek maths', 'ram maths', '12th maths', 'public exam 2026'].map(term => (
                <button
                  key={term}
                  onClick={() => window.location.href = `/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;