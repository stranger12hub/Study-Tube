// Video progress service - saves progress for 24 hours
const VIDEO_PROGRESS_KEY = 'studytube-video-progress';
const EXPIRY_HOURS = 24;

// Save video progress
export const saveVideoProgress = (videoId, timestamp, duration, videoData) => {
  try {
    const progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
    
    progressData[videoId] = {
      timestamp: Math.floor(timestamp),
      duration: Math.floor(duration),
      progress: Math.floor((timestamp / duration) * 100),
      videoData: {
        title: videoData?.title,
        thumbnail: videoData?.thumbnail,
        channelTitle: videoData?.channelTitle
      },
      lastWatched: new Date().toISOString(),
      expiresAt: Date.now() + (EXPIRY_HOURS * 60 * 60 * 1000)
    };
    
    // Clean up expired entries
    Object.keys(progressData).forEach(key => {
      if (progressData[key].expiresAt < Date.now()) {
        delete progressData[key];
      }
    });
    
    localStorage.setItem(VIDEO_PROGRESS_KEY, JSON.stringify(progressData));
    
    // Also save to watch history
    saveToWatchHistory(videoId, timestamp, videoData);
    
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

// Get video progress
export const getVideoProgress = (videoId) => {
  try {
    const progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
    const progress = progressData[videoId];
    
    if (progress && progress.expiresAt > Date.now()) {
      return progress.timestamp;
    }
    return 0;
  } catch (e) {
    return 0;
  }
};

// Save to watch history
const saveToWatchHistory = (videoId, timestamp, videoData) => {
  try {
    const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
    
    const newEntry = {
      videoId,
      title: videoData?.title || 'Unknown Video',
      thumbnail: videoData?.thumbnail,
      channelTitle: videoData?.channelTitle,
      timestamp: Math.floor(timestamp),
      lastWatched: new Date().toISOString()
    };
    
    // Remove duplicate if exists
    const filtered = history.filter(item => item.videoId !== videoId);
    
    // Add new entry at beginning
    filtered.unshift(newEntry);
    
    // Keep only last 50 videos
    const trimmed = filtered.slice(0, 50);
    
    localStorage.setItem('studytube-watch-history', JSON.stringify(trimmed));
    
  } catch (e) {
    console.error('Error saving to history:', e);
  }
};

// Get watch history
export const getWatchHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
  } catch (e) {
    return [];
  }
};

// Clear all progress for a video
export const clearVideoProgress = (videoId) => {
  try {
    const progressData = JSON.parse(localStorage.getItem(VIDEO_PROGRESS_KEY) || '{}');
    delete progressData[videoId];
    localStorage.setItem(VIDEO_PROGRESS_KEY, JSON.stringify(progressData));
  } catch (e) {
    console.error('Error clearing progress:', e);
  }
};