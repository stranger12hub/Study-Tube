import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-dark-900 rounded-2xl overflow-hidden border border-dark-800 animate-pulse-slow">
      {/* Thumbnail Skeleton */}
      <div className="aspect-video bg-dark-800"></div>
      
      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Title lines */}
        <div className="space-y-2">
          <div className="h-4 bg-dark-800 rounded-full w-3/4"></div>
          <div className="h-4 bg-dark-800 rounded-full w-1/2"></div>
        </div>
        
        {/* Description line */}
        <div className="h-3 bg-dark-800 rounded-full w-full"></div>
        <div className="h-3 bg-dark-800 rounded-full w-2/3"></div>
        
        {/* Channel and stats */}
        <div className="flex items-center justify-between pt-3 border-t border-dark-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-dark-800 rounded-full"></div>
            <div className="h-3 bg-dark-800 rounded-full w-20"></div>
          </div>
          <div className="h-3 bg-dark-800 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;