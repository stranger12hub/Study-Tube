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
      <div className="rounded-2xl overflow-hidden transition-all duration-200 relative"
           style={{
             backgroundColor: '#1E2228',
             border: '1px solid #171A1F',
             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = '#171A1F';
             e.currentTarget.style.transform = 'translateY(-2px)';
             e.currentTarget.style.borderColor = '#C47A4A';
             e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.5)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = '#1E2228';
             e.currentTarget.style.transform = 'translateY(0)';
             e.currentTarget.style.borderColor = '#171A1F';
             e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.4)';
           }}>
        
        {/* Copper glow overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
             style={{
               background: 'radial-gradient(circle at 30% 30%, rgba(196, 122, 74, 0.12) 0%, transparent 70%)'
             }} />
        
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-300 
                       ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
          
          {/* Play overlay with copper glow */}
          <div className={`absolute inset-0 flex items-center justify-center
                        transition-opacity duration-200
                        ${isHovered ? 'opacity-100' : 'opacity-0'}`}
               style={{ backgroundColor: 'rgba(15, 17, 21, 0.6)' }}>
            <div className="play-button-glow relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                   style={{ backgroundColor: '#1E2228', border: '1px solid #C47A4A' }}>
                <FaPlay style={{ color: '#F2F2F2' }} className="text-sm ml-0.5" />
              </div>
              {/* Glow effect behind play button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14"
                   style={{
                     background: 'radial-gradient(circle, rgba(196, 122, 74, 0.3) 0%, rgba(196, 122, 74, 0.15) 40%, transparent 70%)',
                     borderRadius: '50%',
                     pointerEvents: 'none'
                   }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2 relative z-10">
          <h3 className="font-medium text-sm line-clamp-2"
              style={{ color: '#F2F2F2' }}>
            {video.title}
          </h3>
          
          <p className="text-xs line-clamp-2" style={{ color: '#B5B5B5' }}>
            {video.description || 'No description available'}
          </p>

          {/* Channel and stats */}
          <div className="flex items-center justify-between pt-2"
               style={{ borderTop: '1px solid #171A1F' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: '#171A1F' }}>
                <FaUserGraduate style={{ color: '#C47A4A' }} className="text-[10px]" />
              </div>
              <span className="text-xs truncate max-w-[90px]" style={{ color: '#B5B5B5' }}>
                {video.channelTitle}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-xs" style={{ color: '#B5B5B5' }}>
              <FaClock className="text-[10px]" />
              <span>{formatDate(video.publishedAt)}</span>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex justify-end">
            <span className="px-2 py-0.5 text-[10px] rounded-full"
                  style={{
                    backgroundColor: '#171A1F',
                    color: '#C47A4A',
                    border: '1px solid #C47A4A'
                  }}>
              ✓ Educational
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;