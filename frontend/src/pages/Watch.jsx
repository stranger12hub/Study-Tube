import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  FaEye, 
  FaThumbsUp, 
  FaCalendar, 
  FaShare, 
  FaExternalLinkAlt,
  FaCheckCircle,
  FaYoutube,
  FaRedoAlt,
  FaClock,
  FaPlayCircle
} from 'react-icons/fa';

// Function to save to history (will be called from this component)
const saveToHistory = (videoData) => {
  try {
    const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
    
    const newEntry = {
      videoId: videoData.videoId,
      title: videoData.title || 'Untitled Video',
      thumbnail: videoData.thumbnail || 'https://via.placeholder.com/320x180?text=StudyTube',
      channelTitle: videoData.channelTitle || 'Unknown Channel',
      timestamp: videoData.timestamp || 0,
      duration: videoData.duration || 0,
      lastWatched: new Date().toISOString()
    };
    
    // Remove duplicate if exists
    const filtered = history.filter(item => item.videoId !== videoData.videoId);
    
    // Add new entry at beginning
    filtered.unshift(newEntry);
    
    // Keep only last 50 videos
    const trimmed = filtered.slice(0, 50);
    
    localStorage.setItem('studytube-watch-history', JSON.stringify(trimmed));
    
    // Dispatch event to notify history page
    window.dispatchEvent(new Event('videoWatched'));
    
    return true;
  } catch (e) {
    console.error('Error saving to history:', e);
    return false;
  }
};

const Watch = () => {
  const { videoId } = useParams();
  const [searchParams] = useSearchParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const saveIntervalRef = useRef(null);
  const progressSavedRef = useRef(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/search/video/${videoId}`);
        setVideo(response.data);
        
        // Check for saved progress
        const savedTime = localStorage.getItem(`video-progress-${videoId}`);
        const urlTime = searchParams.get('t');
        
        if (urlTime) {
          setResumeTime(parseInt(urlTime));
        } else if (savedTime) {
          setResumeTime(parseInt(savedTime));
          setShowResumePrompt(true);
        }
        
        // Save to history immediately when video loads
        saveToHistory({
          videoId,
          title: response.data.title,
          thumbnail: response.data.thumbnail,
          channelTitle: response.data.channelTitle,
          timestamp: 0,
          duration: 0
        });
        
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load video');
        console.error('Error loading video:', err);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }

    // Cleanup on unmount
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, [videoId]);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onload = () => {
        window.onYouTubeIframeAPIReady = initPlayer;
      };
      document.body.appendChild(tag);
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    }
  }, [video]);

  const initPlayer = () => {
    if (!playerRef.current && window.YT && window.YT.Player && video && playerContainerRef.current) {
      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          start: resumeTime,
          playsinline: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }
  };

  const onPlayerReady = (event) => {
    setPlayerReady(true);
    
    // Start progress tracking
    saveIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        
        if (currentTime > 0 && !progressSavedRef.current) {
          // Save progress
          localStorage.setItem(`video-progress-${videoId}`, Math.floor(currentTime).toString());
          
          // Update history with timestamp
          const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
          const updatedHistory = history.map(item => {
            if (item.videoId === videoId) {
              return {
                ...item,
                timestamp: Math.floor(currentTime),
                duration: Math.floor(duration),
                lastWatched: new Date().toISOString()
              };
            }
            return item;
          });
          localStorage.setItem('studytube-watch-history', JSON.stringify(updatedHistory));
          
          // Dispatch event
          window.dispatchEvent(new Event('videoWatched'));
        }
      }
    }, 5000);
  };

  const onPlayerStateChange = (event) => {
    // Video ended (0)
    if (event.data === 0) {
      // Clear progress for this video
      localStorage.removeItem(`video-progress-${videoId}`);
      
      // Update history to show completed
      const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
      const updatedHistory = history.map(item => {
        if (item.videoId === videoId) {
          return {
            ...item,
            timestamp: 0,
            lastWatched: new Date().toISOString()
          };
        }
        return item;
      });
      localStorage.setItem('studytube-watch-history', JSON.stringify(updatedHistory));
      window.dispatchEvent(new Event('videoWatched'));
    }
    
    // Video paused (2)
    if (event.data === 2 && playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      if (currentTime > 0) {
        localStorage.setItem(`video-progress-${videoId}`, Math.floor(currentTime).toString());
        
        // Update history
        const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
        const updatedHistory = history.map(item => {
          if (item.videoId === videoId) {
            return {
              ...item,
              timestamp: Math.floor(currentTime),
              lastWatched: new Date().toISOString()
            };
          }
          return item;
        });
        localStorage.setItem('studytube-watch-history', JSON.stringify(updatedHistory));
        window.dispatchEvent(new Event('videoWatched'));
      }
    }
  };

  const handleResume = () => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(resumeTime, true);
      setShowResumePrompt(false);
    }
  };

  const handleStartOver = () => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(0, true);
      setShowResumePrompt(false);
      localStorage.removeItem(`video-progress-${videoId}`);
    }
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="relative pb-[56.25%] bg-dark-900 rounded-2xl overflow-hidden shimmer">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-elegant-gold/5 to-transparent"></div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-dark-800 rounded-full w-3/4 shimmer"></div>
          <div className="h-4 bg-dark-800 rounded-full w-1/2 shimmer"></div>
          <div className="h-4 bg-dark-800 rounded-full w-2/3 shimmer"></div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FaYoutube className="text-red-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-3">Video Unavailable</h2>
          <p className="text-gray-400 mb-6">{error || 'This video could not be loaded'}</p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Video Player */}
      <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden bg-dark-900 
                      shadow-2xl shadow-black/50 border border-elegant-gold/20
                      group hover:border-elegant-gold/40 transition-all duration-500">
        <div 
          ref={playerContainerRef}
          id="youtube-player"
          className="absolute top-0 left-0 w-full h-full"
        ></div>
        
        {/* Resume Prompt */}
        {showResumePrompt && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                        glass-effect rounded-xl p-4 shadow-2xl border border-elegant-gold
                        flex items-center gap-4 z-10 animate-slide-up">
            <FaClock className="text-elegant-gold" />
            <p className="text-sm">
              Resume from <span className="text-elegant-gold font-semibold">
                {formatTime(resumeTime)}
              </span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleResume}
                className="px-3 py-1 bg-gradient-to-r from-elegant-gold to-elegant-bronze 
                         text-dark-950 rounded-lg text-sm font-medium
                         hover:shadow-lg hover:shadow-elegant-gold/30 transition-all"
              >
                Resume
              </button>
              <button
                onClick={handleStartOver}
                className="px-3 py-1 bg-dark-800 text-elegant-cream rounded-lg 
                         text-sm hover:bg-dark-700 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="glass-effect rounded-2xl p-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">
            {video.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Channel Info */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-elegant-gold to-elegant-bronze 
                            rounded-full flex items-center justify-center shadow-lg">
                <span className="text-dark-950 text-lg font-bold">
                  {video.channelTitle?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-elegant-cream">{video.channelTitle}</h3>
                <p className="text-sm text-elegant-cream/60">Educational Channel</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 
                         rounded-xl transition-all duration-300 border border-elegant-gold/20
                         hover:border-elegant-gold/50 group relative"
              >
                <FaShare className="text-elegant-gold/70 group-hover:text-elegant-gold" />
                <span className="text-elegant-cream/70 group-hover:text-elegant-cream">Share</span>
                {showShare && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                                   bg-gradient-to-r from-elegant-gold to-elegant-bronze 
                                   text-dark-950 text-sm px-3 py-1 rounded-lg
                                   animate-bounce-slow font-medium">
                    Copied!
                  </span>
                )}
              </button>
              
              <a 
                href={`https://youtu.be/${videoId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 
                         rounded-xl transition-all duration-300 border border-elegant-gold/20
                         hover:border-elegant-gold/50 group"
              >
                <FaExternalLinkAlt className="text-elegant-gold/70 group-hover:text-elegant-gold" />
                <span className="text-elegant-cream/70 group-hover:text-elegant-cream">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-800/50 rounded-xl p-4 text-center group hover:bg-dark-800 transition-all">
            <FaEye className="text-elegant-gold text-xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xl font-bold text-elegant-cream">{formatNumber(video.viewCount)}</div>
            <div className="text-xs text-elegant-cream/50">Views</div>
          </div>
          
          <div className="bg-dark-800/50 rounded-xl p-4 text-center group hover:bg-dark-800 transition-all">
            <FaThumbsUp className="text-elegant-bronze text-xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xl font-bold text-elegant-cream">{formatNumber(video.likeCount)}</div>
            <div className="text-xs text-elegant-cream/50">Likes</div>
          </div>
          
          <div className="bg-dark-800/50 rounded-xl p-4 text-center group hover:bg-dark-800 transition-all">
            <FaCalendar className="text-elegant-copper text-xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-bold text-elegant-cream">{formatDate(video.publishedAt)}</div>
            <div className="text-xs text-elegant-cream/50">Published</div>
          </div>
          
          <div className="bg-dark-800/50 rounded-xl p-4 text-center group hover:bg-dark-800 transition-all">
            <FaCheckCircle className="text-elegant-gold text-xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-bold text-elegant-cream">Verified</div>
            <div className="text-xs text-elegant-cream/50">Educational</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-dark-800/30 rounded-xl p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-elegant-gold to-elegant-bronze rounded-full"></span>
            <span className="text-elegant-gold">Description</span>
          </h3>
          <p className="text-elegant-cream/70 whitespace-pre-wrap leading-relaxed">
            {video.description || 'No description available for this video.'}
          </p>
        </div>
      </div>

      {/* Related Link */}
      <div className="flex justify-center">
        <Link 
          to={`/search?q=${encodeURIComponent(video.channelTitle)}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800/50 
                   hover:bg-dark-800 rounded-xl transition-all duration-300 
                   border border-elegant-gold/20 hover:border-elegant-gold/50
                   group"
        >
          <FaPlayCircle className="text-elegant-gold group-hover:scale-110 transition-transform" />
          <span className="text-elegant-cream">More from {video.channelTitle}</span>
        </Link>
      </div>
    </div>
  );
};

export default Watch;