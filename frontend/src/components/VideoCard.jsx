import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaClock, FaUserGraduate } from 'react-icons/fa';

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      className="group block focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                    hover:border-primary group-hover:border-primary">
        
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden aspect-video">
          {!imageError ? (
            <img 
              src={video.thumbnail} 
              alt={video.title}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-500 
                        ${isHovered ? 'scale-110' : 'scale-100'}`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#2a2a2a] flex items-center justify-center">
              <FaPlay className="text-primary text-3xl opacity-30" />
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Button Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center
                        transition-all duration-300 transform
                        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center
                          shadow-lg shadow-primary/30">
              <FaPlay className="text-white text-lg ml-0.5" />
            </div>
          </div>

          {/* Duration Badge */}
          {video.duration && (
            <span className="absolute bottom-2 right-2 px-2 py-1 
                           bg-[#0d0d0d]/80 text-white text-xs 
                           rounded-lg border border-[#2a2a2a] backdrop-blur-sm">
              {video.duration}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-white text-sm line-clamp-2 mb-2
                       group-hover:text-primary transition-colors duration-300">
            {video.title}
          </h3>
          
          <p className="text-xs text-secondary line-clamp-2 mb-3">
            {video.description || 'No description available'}
          </p>

          {/* Channel and Date */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#2a2a2a] rounded-full flex items-center justify-center
                            group-hover:bg-primary/20 transition-colors duration-300">
                <FaUserGraduate className="text-primary text-[10px]" />
              </div>
              <span className="text-xs text-secondary truncate max-w-[100px]
                             group-hover:text-white transition-colors duration-300">
                {video.channelTitle}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-secondary">
              <FaClock className="text-[10px]" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="mt-3 flex justify-end">
            <span className="px-2 py-0.5 bg-[#2a2a2a] text-primary text-[10px] 
                         rounded-full border border-primary/30
                         group-hover:bg-primary/10 transition-colors duration-300">
              ✓ Educational
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;