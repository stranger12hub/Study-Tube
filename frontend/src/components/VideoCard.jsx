import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaClock, FaUserGraduate } from 'react-icons/fa';

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
            <div className="w-12 h-12 bg-card-elevated rounded-full flex items-center justify-center
                          border border-border shadow-soft">
              <FaPlay className="text-text-primary text-lg ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-medium text-base line-clamp-2 group-hover:text-text-primary 
                       transition-colors duration-200">
            {video.title}
          </h3>
          
          <p className="text-sm text-text-secondary line-clamp-2">
            {video.description || 'No description available'}
          </p>

          {/* Channel and stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-card-hover rounded-full flex items-center justify-center">
                <FaUserGraduate className="text-text-secondary text-xs" />
              </div>
              <span className="text-xs text-text-secondary truncate max-w-[100px]">
                {video.channelTitle}
              </span>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <FaClock className="text-xs" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex justify-end">
            <span className="badge-verified text-xs px-2 py-0.5">
              ✓ Educational Channel
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;