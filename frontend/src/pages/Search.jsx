import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [searchInput, setSearchInput] = useState(query || '');
  const [showFilters, setShowFilters] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  };

  // Empty state - no search query
  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Search Educational Content
          </h1>
          <p className="text-gray-400 mb-8">
            Find videos from Vivek Maths, Ram Maths, and other curated channels
          </p>
          
          {/* Centered Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for videos..."
                className="w-full px-6 py-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl
                         text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-[#e66e23] focus:border-transparent
                         transition-all duration-300 group-hover:border-[#e66e23]/50"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2
                         px-6 py-2 bg-[#e66e23] text-white rounded-xl
                         hover:bg-[#cf5f1c] transition-all duration-300
                         hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {['vivek maths', 'ram maths', '12th maths', 'public exam 2026'].map(term => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className="px-4 py-2 bg-[#141414] border border-[#2a2a2a] rounded-xl
                         text-gray-400 hover:text-white hover:border-[#e66e23]
                         transition-all duration-300 hover:scale-105"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Searching for "{query}"
          </h1>
          <p className="text-gray-400">Finding the best educational content...</p>
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-[#2a2a2a]" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
                <div className="h-3 bg-[#2a2a2a] rounded w-full" />
                <div className="h-3 bg-[#2a2a2a] rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Search Failed</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#e66e23] text-white rounded-xl
                     hover:bg-[#cf5f1c] transition-all duration-300
                     hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Results view
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Results for "{query}"
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-400">
            Found {videos.length} videos
            {fromCache && ' (cached results)'}
          </p>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#2a2a2a] rounded-xl
                     text-gray-400 hover:text-white hover:border-[#e66e23]
                     transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FaFilter className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-[#141414] border border-[#2a2a2a] rounded-xl animate-fadeIn">
            <div className="flex flex-wrap gap-2">
              {['all', 'today', 'week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg
                           text-gray-400 hover:text-white hover:border-[#e66e23]
                           transition-all duration-300 hover:scale-105"
                >
                  {period === 'all' ? 'All Time' : period}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-12 bg-[#141414] border border-[#2a2a2a] rounded-2xl">
          <p className="text-gray-400">No videos found. Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.videoId}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}

      {/* Results count footer */}
      {videos.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {videos.length} results • Powered by YouTube Data API
        </div>
      )}
    </div>
  );
};

export default Search;