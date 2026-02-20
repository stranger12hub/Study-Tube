import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaEye, FaThumbsUp, FaCalendar } from 'react-icons/fa';

const VideoCard = ({ video }) => {
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
    <Link to={`/watch/${video.videoId}`} className="group">
      <div className="bg-dark-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 
                      hover:-translate-y-2 transition-all duration-500 
                      border border-dark-800 hover:border-accent-blue/50
                      hover:shadow-2xl hover:shadow-accent-blue/20">
        
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 
                        transition-all duration-500 transform group-hover:scale-100 scale-50">
            <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center
                          shadow-lg shadow-accent-blue/50">
              <FaPlayCircle className="text-white text-3xl" />
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-5">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-accent-blue 
                       transition-colors duration-300 mb-2">
            {video.title}
          </h3>
          
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {video.description || 'No description available'}
          </p>
          
          {/* Channel & Stats */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple 
                            rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {video.channelTitle?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-400 truncate max-w-[120px]">
                {video.channelTitle}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <FaCalendar className="text-accent-blue/70" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;