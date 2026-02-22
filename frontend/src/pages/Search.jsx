import React from 'react';
import VideoCard from '../components/VideoCard';

// Example video data for testing layout
const sampleVideos = [
  { videoId: '1', title: '12th Maths - Integration Basics', description: 'Learn integration from scratch', thumbnail: 'https://i.ytimg.com/vi/example1/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
  { videoId: '2', title: '12th Maths - Differentiation', description: 'Complete differentiation guide', thumbnail: 'https://i.ytimg.com/vi/example2/mqdefault.jpg', channelTitle: 'Ram Maths', publishedAt: new Date().toISOString() },
  { videoId: '3', title: 'Physics - Modern Physics', description: 'Modern physics concepts explained', thumbnail: 'https://i.ytimg.com/vi/example3/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
  { videoId: '4', title: 'Chemistry - Organic Chemistry', description: 'Organic chemistry basics', thumbnail: 'https://i.ytimg.com/vi/example4/mqdefault.jpg', channelTitle: 'Ram Maths', publishedAt: new Date().toISOString() },
  { videoId: '5', title: '12th Maths - Integration Problems', description: 'Practice integration problems', thumbnail: 'https://i.ytimg.com/vi/example5/mqdefault.jpg', channelTitle: 'Vivek Maths', publishedAt: new Date().toISOString() },
  { videoId: '6', title: '12th Maths - Differentiation Problems', description: 'Practice differentiation problems', thumbnail: 'https://i.ytimg.com/vi/example6/mqdefault.jpg', channelTitle: 'Ram Maths', publishedAt: new Date().toISOString() },
];

const Search = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#EAEAEA]">Search Results</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#A1A1AA]">12 videos</span>
          <button className="px-4 py-2 bg-[#1F2023] border border-[#2E3035] rounded-xl text-sm text-[#A1A1AA] hover:bg-[#2A2B2F] transition-colors">
            Filter
          </button>
        </div>
      </div>

      {/* VIDEO GRID - 3 columns desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleVideos.map(video => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Search;