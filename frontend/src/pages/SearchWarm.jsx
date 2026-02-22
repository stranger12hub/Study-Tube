import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaCheckCircle, 
  FaFire,
  FaClock,
  FaArrowRight,
  FaStar,
  FaGraduationCap,
  FaChartLine,
  FaBook,
  FaYoutube
} from 'react-icons/fa';

// Video Card Component
const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <Link 
      to={`/watch/${video.videoId}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-dark-900/50 
                    backdrop-blur-sm border border-dark-800/50
                    hover:border-amber-500/40 hover:bg-dark-900/80
                    transition-all duration-500 hover:-translate-y-2
                    hover:shadow-2xl hover:shadow-amber-500/20">
        
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-700 
                       ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-16 h-16 bg-gradient-to-r from-amber-500 to-gold-500 
                          rounded-full flex items-center justify-center
                          shadow-xl shadow-amber-500/30 transform transition-all duration-500
                          ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <svg className="w-8 h-8 text-dark-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          {/* Duration Badge (if available) */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-dark-950/90 
                          text-amber-400 text-xs rounded-lg border border-amber-500/30
                          backdrop-blur-sm">
              {video.duration}
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-5">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-amber-400 
                       transition-colors duration-300">
            {video.title}
          </h3>
          
          <p className="text-sm text-dark-400 mb-3 line-clamp-2">
            {video.description || 'No description available'}
          </p>
          
          {/* Channel Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-gold-500 
                            rounded-full flex items-center justify-center">
                <FaGraduationCap className="text-dark-950 text-sm" />
              </div>
              <span className="text-sm text-dark-300 font-medium">
                {video.channelTitle}
              </span>
            </div>
            
            {/* Verified Badge */}
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 
                         rounded-full border border-amber-500/30">
              ✓ Verified
            </span>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-dark-500 
                        pt-3 border-t border-dark-800">
            <span className="flex items-center gap-1">
              <FaClock className="text-amber-400/70" />
              {formatDate(video.publishedAt)}
            </span>
            {video.viewCount && (
              <span className="flex items-center gap-1">
                <FaFire className="text-amber-400/70" />
                {parseInt(video.viewCount).toLocaleString()} views
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="rounded-2xl bg-dark-900/50 border border-dark-800/50 overflow-hidden">
    <div className="aspect-video bg-dark-800 shimmer"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-dark-800 rounded-full w-3/4 shimmer"></div>
      <div className="h-3 bg-dark-800 rounded-full w-1/2 shimmer"></div>
      <div className="h-3 bg-dark-800 rounded-full w-2/3 shimmer"></div>
    </div>
  </div>
);

const SearchWarm = () => {
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          {/* Animated Search Icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-gold-500 
                          rounded-3xl animate-pulse-glow opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-gold-500 
                          rounded-3xl animate-ping opacity-30"></div>
            <div className="relative w-32 h-32 bg-gradient-to-r from-amber-500 to-gold-500 
                          rounded-3xl flex items-center justify-center shadow-2xl
                          transform hover:scale-110 transition-transform duration-500">
              <FaSearch className="text-dark-950 text-5xl" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Discover</span> Knowledge
          </h2>
          <p className="text-dark-400 text-lg mb-8">
            Search from thousands of educational videos across mathematics, science, 
            and exam preparation.
          </p>
          
          {/* Popular Searches */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['12th maths', 'vivek maths', 'ram maths', 'public exam 2026'].map(term => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className="group px-6 py-3 bg-dark-800/50 hover:bg-dark-800 
                         rounded-xl text-dark-300 hover:text-amber-400 
                         transition-all duration-300 border border-dark-700 
                         hover:border-amber-500/50 flex items-center gap-2"
              >
                <FaSearch className="text-amber-400/70 text-sm" />
                {term}
                <FaArrowRight className="opacity-0 group-hover:opacity-100 
                                       group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-8 px-4">
        {/* Header Skeleton */}
        <div className="glass-effect rounded-2xl p-8">
          <div className="h-8 bg-dark-800 rounded-full w-64 mb-4 shimmer"></div>
          <div className="h-4 bg-dark-800 rounded-full w-96 shimmer"></div>
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-rose-500/20 rounded-3xl flex items-center 
                        justify-center mx-auto mb-6">
            <FaTimes className="text-rose-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-rose-400 mb-3">Oops! Something went wrong</h2>
          <p className="text-dark-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-gold-500 
                     text-dark-950 font-bold rounded-xl hover:shadow-lg 
                     hover:shadow-amber-500/30 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4">
      {/* Results Header */}
      <div className="glass-effect rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              Results for "<span className="text-gradient">{query}</span>"
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-dark-400">
                Found <span className="text-amber-400 font-bold text-lg">{videos.length}</span> videos
              </span>
              {fromCache && (
                <span className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 
                               text-amber-400 rounded-full border border-amber-500/30">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm font-medium">Cached results (24h)</span>
                </span>
              )}
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-dark-800/50 
                     hover:bg-dark-800 rounded-xl transition-all duration-300 
                     border border-dark-700 hover:border-amber-500/50 group"
          >
            <FaFilter className={`transition-transform duration-300 
                               ${showFilters ? 'rotate-180 text-amber-400' : 'text-dark-400'}`} />
            <span className="text-dark-300">Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-dark-800 animate-slide-down">
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-dark-800/50 border border-dark-700 
                         rounded-xl text-dark-300 focus:outline-none 
                         focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
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
            <div className="w-24 h-24 bg-dark-800/50 rounded-3xl flex items-center 
                          justify-center mx-auto mb-6">
              <FaSearch className="text-dark-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-dark-400 mb-3">No videos found</h2>
            <p className="text-dark-500 mb-6">
              We couldn't find any videos matching "{query}" in our curated channels.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['12th maths', 'vivek maths', 'ram maths'].map(term => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 bg-dark-800/50 hover:bg-dark-800 
                           rounded-lg text-dark-400 hover:text-amber-400 
                           transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map(video => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>

          {/* Results Footer */}
          <div className="text-center text-sm text-dark-500 pt-8">
            Showing {videos.length} results • Powered by YouTube Data API
          </div>
        </>
      )}
    </div>
  );
};

export default SearchWarm;