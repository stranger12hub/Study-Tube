import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="card p-0 overflow-hidden">
      {/* Thumbnail skeleton */}
      <div className="aspect-video bg-card-hover/30 shimmer" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-card-hover/30 rounded w-3/4 shimmer" />
        <div className="h-3 bg-card-hover/30 rounded w-full shimmer" />
        <div className="h-3 bg-card-hover/30 rounded w-2/3 shimmer" />
        
        {/* Channel and stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-card-hover/30 rounded-full shimmer" />
            <div className="h-3 bg-card-hover/30 rounded w-16 shimmer" />
          </div>
          <div className="h-3 bg-card-hover/30 rounded w-12 shimmer" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;