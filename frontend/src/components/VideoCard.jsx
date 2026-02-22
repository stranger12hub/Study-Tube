import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaClock, FaEye } from 'react-icons/fa';

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);

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
    <Link 
      to={`/watch/${video.videoId}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card overflow-hidden">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-500 
                       ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play button overlay */}
          <div className={`absolute inset-0 flex items-center justify-center
                        transition-all duration-300 transform
                        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center
                          shadow-glow animate-glow">
              <FaPlay className="text-primary-bg text-lg" />
            </div>
          </div>

          {/* Duration badge */}
          {video.duration && (
            <span className="absolute bottom-2 right-2 px-2 py-1 bg-primary-bg/80 
                           text-accent-light text-xs rounded-lg backdrop-blur-sm
                           border border-accent/20">
              {video.duration}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-accent-light 
                       transition-colors duration-200">
            {video.title}
          </h3>
          
          <p className="text-sm text-accent-light/60 line-clamp-2">
            {video.description || 'No description available'}
          </p>

          {/* Channel and stats */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-accent-light text-xs font-medium">
                  {video.channelTitle?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-accent-light/70 truncate max-w-[100px]">
                {video.channelTitle}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-accent-light/50">
              <FaClock className="text-accent/70" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex justify-end">
            <span className="badge text-xs">✓ Educational Channel</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;