import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import Button from '../components/Button';
import { FaSearch, FaFilter, FaTimes, FaCheckCircle } from 'react-icons/fa';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('all');

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
      <div className="min-h-[60vh] flex items-center justify-center animate-fadeIn">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-[#1a1a1a] rounded-2xl flex items-center justify-center
                        mx-auto mb-6 border border-[#2a2a2a] group hover:border-primary 
                        hover:scale-110 transition-all duration-300">
            <FaSearch className="text-4xl text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 animate-slideUp">
            Search Videos
          </h2>
          <p className="text-secondary mb-6 animate-slideUp" style={{ animationDelay: '100ms' }}>
            Enter a search term to find educational content from curated channels
          </p>
          <div className="flex flex-wrap gap-2 justify-center animate-slideUp" style={{ animationDelay: '200ms' }}>
            {['vivek maths', 'ram maths', '12th maths'].map(term => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg
                         text-secondary hover:text-primary hover:border-primary
                         hover:scale-105 transition-all duration-300"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
          <div className="h-8 bg-[#1a1a1a] rounded w-64 mb-2 animate-pulse" />
          <div className="h-4 bg-[#1a1a1a] rounded w-96 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden
                                   animate-pulse">
              <div className="aspect-video bg-[#2a2a2a]" />
              <div className="p-4 space-y-2">
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

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4 animate-bounce">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Search Failed</h2>
          <p className="text-secondary mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with stats */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6
                    hover:border-primary/30 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Results for "<span className="text-primary">"{query}"</span>
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-secondary">
                Found <span className="text-primary font-semibold">{videos.length}</span> videos
              </span>
              {fromCache && (
                <span className="flex items-center gap-2 px-3 py-1 
                               bg-primary/10 text-primary rounded-full
                               border border-primary/30 text-sm animate-fadeIn">
                  <FaCheckCircle size={12} />
                  <span>Cached results</span>
                </span>
              )}
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border
                      transition-all duration-300 hover:scale-105 active:scale-95
                      ${showFilters 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-[#1a1a1a] text-secondary border-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white'
                      }`}
          >
            <FaFilter size={14} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-[#2a2a2a] animate-slideDown">
            <div className="flex flex-wrap gap-2">
              {['all', 'today', 'week', 'month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setFilter(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium
                            transition-all duration-300 hover:scale-105
                            ${filter === period 
                              ? 'bg-primary text-white' 
                              : 'bg-[#1a1a1a] text-secondary hover:bg-[#2a2a2a] hover:text-white'
                            }`}
                >
                  {period === 'all' ? 'All Time' : period}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-12 bg-[#141414] border border-[#2a2a2a] rounded-xl
                      hover:border-primary/30 transition-all duration-300">
          <FaSearch className="text-4xl text-secondary mx-auto mb-3" />
          <p className="text-secondary">No videos found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div key={video.videoId} 
                 className="animate-fadeIn"
                 style={{ animationDelay: `${index * 50}ms` }}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;