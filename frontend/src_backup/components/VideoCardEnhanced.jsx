import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaEye, FaThumbsUp, FaClock, FaUserGraduate } from 'react-icons/fa';

const VideoCardEnhanced = ({ video }) => {
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

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views.toString();
  };

  return (
    <Link 
      to={`/watch/${video.videoId}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card rounded-2xl overflow-hidden transform transition-all duration-500
                    hover:scale-105 hover:-translate-y-2">
        
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
            <div className={`w-16 h-16 bg-gradient-to-r from-accent-blue to-accent-purple 
                          rounded-full flex items-center justify-center
                          shadow-xl shadow-accent-blue/30 transform transition-all duration-500
                          ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <FaPlayCircle className="text-white text-3xl" />
            </div>
          </div>

          {/* Duration Badge (if available) */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white 
                          text-xs rounded-lg backdrop-blur-sm">
              {video.duration}
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-5">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-accent-blue 
                       transition-colors duration-300">
            {video.title}
          </h3>
          
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {video.description || 'No description available'}
          </p>
          
          {/* Channel Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple 
                            rounded-full flex items-center justify-center">
                <FaUserGraduate className="text-white text-sm" />
              </div>
              <span className="text-sm text-gray-300 font-medium">
                {video.channelTitle}
              </span>
            </div>
            
            {/* Verified Badge (if from allowed channels) */}
            <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded-full">
              ✓ Verified
            </span>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 
                        pt-3 border-t border-dark-800">
            <div className="flex items-center space-x-3">
              {video.viewCount && (
                <span className="flex items-center gap-1">
                  <FaEye className="text-accent-blue/70" />
                  {formatViews(video.viewCount)} views
                </span>
              )}
              {video.likeCount && (
                <span className="flex items-center gap-1">
                  <FaThumbsUp className="text-accent-green/70" />
                  {formatViews(video.likeCount)}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1">
              <FaClock className="text-accent-purple/70" />
              {formatDate(video.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCardEnhanced;