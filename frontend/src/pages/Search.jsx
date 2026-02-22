import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

// Sample data for layout testing
const sampleVideos = [
  { videoId: '1', title: '12th Maths - Integration Basics', description: 'Learn integration from scratch with step by step explanations', thumbnail: 'https://i.ytimg.com/vi/example1/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
  { videoId: '2', title: '12th Maths - Differentiation Formulas', description: 'Complete differentiation guide with examples', thumbnail: 'https://i.ytimg.com/vi/example2/mqdefault.jpg', channelTitle: 'Ram Maths', publishedAt: new Date().toISOString() },
  { videoId: '3', title: 'Physics - Modern Physics Concepts', description: 'Modern physics concepts explained simply', thumbnail: 'https://i.ytimg.com/vi/example3/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
  { videoId: '4', title: 'Chemistry - Organic Chemistry Basics', description: 'Organic chemistry fundamentals', thumbnail: 'https://i.ytimg.com/vi/example4/mqdefault.jpg', channelTitle: 'Ram Maths', publishedAt: new Date().toISOString() },
  { videoId: '5', title: '12th Maths - Integration Problems', description: 'Practice integration problems with solutions', thumbnail: 'https://i.ytimg.com/vi/example5/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
  { videoId: '6', title: '12th Maths - Differentiation Problems', description: 'Practice differentiation problems', thumbnail: 'https://i.ytimg.com/vi/example6/mqdefault.jpg', channelTitle: 'Ram Maths', publishedAt: new Date().toISOString() },
  { videoId: '7', title: 'Physics - Electromagnetism', description: 'Learn electromagnetism basics', thumbnail: 'https://i.ytimg.com/vi/example7/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
  { videoId: '8', title: 'Chemistry - Periodic Table', description: 'Periodic table explained', thumbnail: 'https://i.ytimg.com/vi/example8/mqdefault.jpg', channelTitle: 'Ram Maths', publishedAt: new Date().toISOString() },
  { videoId: '9', title: '12th Maths - Vector Algebra', description: 'Vector algebra complete guide', thumbnail: 'https://i.ytimg.com/vi/example9/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setVideos(sampleVideos);
      setLoading(false);
    }, 1000);
  }, [query]);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">
            {query ? `Results for "${query}"` : 'Search Results'}
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">{videos.length} videos found</p>
        </div>
        
        <button className="px-4 py-2 bg-[#1F2023] border border-[#2E3035] rounded-xl text-sm text-[#A1A1AA] hover:bg-[#2A2B2F] transition-colors">
          Filter
        </button>
      </div>

      {/* VIDEO GRID - Proper responsive grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1F2023] border border-[#2E3035] rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-[#2A2B2F]/30" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-[#2A2B2F]/30 rounded w-3/4" />
                <div className="h-3 bg-[#2A2B2F]/30 rounded w-full" />
                <div className="h-3 bg-[#2A2B2F]/30 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;