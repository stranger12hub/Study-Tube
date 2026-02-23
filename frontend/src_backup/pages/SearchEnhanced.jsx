import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import VideoCardEnhanced from '../components/VideoCardEnhanced';
import { FaSearch, FaFilter, FaTimes, FaCheckCircle, FaFire, FaClock } from 'react-icons/fa';

const SearchEnhanced = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (!query) return;

    const searchVideos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
        setVideos(response.data.results || []);
        setFromCache(response.data.fromCache || false);
      } catch (err) {
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
        <div className="text-center max-w-2xl">
          <div className="w-32 h-32 bg-gradient-to-br from-accent-blue to-accent-purple 
                        rounded-3xl flex items-center justify-center mx-auto mb-8
                        animate-float shadow-2xl">
            <FaSearch className="text-white text-5xl" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Discover</span> Knowledge
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Search from thousands of educational videos across mathematics, science, 
            and exam preparation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {['12th maths', 'vivek maths', 'ram maths', 'public exam 2026'].map(term => (
              <button
                key={term}
                onClick={() => window.location.href = `/search?q=${encodeURIComponent(term)}`}
                className="px-6 py-3 bg-dark-800 hover:bg-dark-700 rounded-xl 
                         text-gray-300 hover:text-white transition-all duration-300
                         border border-dark-700 hover:border-accent-blue/50"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="glass-effect rounded-2xl p-8">
          <div className="h-8 bg-dark-800 rounded-full w-64 mb-4 shimmer"></div>
          <div className="h-4 bg-dark-800 rounded-full w-96 shimmer"></div>
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
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

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FaTimes className="text-red-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-3">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
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
      {/* Results Header */}
      <div className="glass-effect rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              Results for "<span className="text-gradient">{query}</span>"
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-400">
                Found <span className="text-accent-blue font-bold text-lg">{videos.length}</span> videos
              </span>
              {fromCache && (
                <span className="flex items-center gap-2 px-4 py-2 bg-green-500/10 
                               text-green-400 rounded-full border border-green-500/30">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm font-medium">Cached results (24h)</span>
                </span>
              )}
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-dark-800 hover:bg-dark-700 
                     rounded-xl transition-all duration-300 border border-dark-700
                     hover:border-accent-blue/50 group"
          >
            <FaFilter className={`transition-transform duration-300 
                               ${showFilters ? 'rotate-180 text-accent-blue' : 'text-gray-400'}`} />
            <span className="text-gray-300">Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-dark-800 animate-slide-down">
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-xl 
                         text-gray-300 focus:outline-none focus:border-accent-blue"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="date">Sort by: Date</option>
                <option value="views">Sort by: Views</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {videos.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-dark-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mb-3">No videos found</h2>
            <p className="text-gray-500 mb-6">
              We couldn't find any videos matching "{query}" in our curated channels.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['12th maths', 'vivek maths', 'ram maths'].map(term => (
                <button
                  key={term}
                  onClick={() => window.location.href = `/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg 
                           text-gray-400 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map(video => (
              <VideoCardEnhanced key={video.videoId} video={video} />
            ))}
          </div>

          {/* Results Footer */}
          <div className="text-center text-sm text-gray-500 pt-8">
            Showing {videos.length} results • Powered by YouTube Data API
          </div>
        </>
      )}
    </div>
  );
};

export default SearchEnhanced;