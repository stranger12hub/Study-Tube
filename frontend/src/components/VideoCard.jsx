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
      <div className="card card-hover overflow-hidden">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-300 
                       ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          
          {/* Play overlay */}
          <div className={`absolute inset-0 bg-primary-bg/30 flex items-center justify-center
                        transition-opacity duration-200
                        ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-10 h-10 bg-surface-card rounded-full flex items-center justify-center
                          border border-border">
              <FaPlay className="text-text-primary text-sm ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-text-primary text-sm line-clamp-2 group-hover:text-text-primary/90">
            {video.title}
          </h3>
          
          <p className="text-xs text-text-secondary line-clamp-2">
            {video.description || 'No description available'}
          </p>

          {/* Channel and stats */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-surface-hover rounded-full flex items-center justify-center">
                <FaUserGraduate className="text-text-secondary text-[10px]" />
              </div>
              <span className="text-xs text-text-secondary truncate max-w-[90px]">
                {video.channelTitle}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <FaClock className="text-[10px]" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex justify-end">
            <span className="badge-verified text-[10px]">
              ✓ Educational
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;