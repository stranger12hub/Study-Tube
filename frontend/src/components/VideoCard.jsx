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
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden
                    transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-300 
                       ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center
                        transition-opacity duration-200
                        ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <FaPlay className="text-[#C47A4A] text-sm ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
            {video.title}
          </h3>
          
          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
            {video.description || 'No description available'}
          </p>

          {/* Channel and date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FaUserGraduate className="text-[#C47A4A] text-xs" />
              <span className="text-xs text-gray-600 truncate max-w-[100px]">
                {video.channelTitle}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <FaClock className="text-xs" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;