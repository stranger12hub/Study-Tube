import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaEye, 
  FaThumbsUp, 
  FaCalendar, 
  FaShare, 
  FaFlag,
  FaCheckCircle,
  FaYoutube,
  FaExternalLinkAlt,
  FaPlayCircle,
  FaPauseCircle
} from 'react-icons/fa';

const Watch = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);
  
  // Video player state
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [savedTimestamp, setSavedTimestamp] = useState(0);
  const playerRef = useRef(null);

  // Get timestamp from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t');
    if (t) {
      setSavedTimestamp(parseInt(t));
    }
  }, []);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search/video/${videoId}`);
        setVideo(response.data);
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
  }, [videoId]);

  // Save to watch history
  const saveToHistory = (timestamp) => {
    try {
      const history = JSON.parse(localStorage.getItem('studytube-history') || '[]');
      
      const existingIndex = history.findIndex(item => item.videoId === videoId);
      
      const historyEntry = {
        videoId,
        title: video?.title,
        thumbnail: video?.thumbnail,
        channelTitle: video?.channelTitle,
        timestamp: Math.floor(timestamp),
        duration: Math.floor(duration),
        lastWatched: new Date().toISOString()
      };
      
      if (existingIndex !== -1) {
        history[existingIndex] = historyEntry;
      } else {
        history.unshift(historyEntry);
        if (history.length > 100) history.pop();
      }
      
      localStorage.setItem('studytube-history', JSON.stringify(history));
      console.log('✅ Saved to history:', Math.floor(timestamp));
    } catch (err) {
      console.error('Error saving to history:', err);
    }
  };

  // YouTube Player API
  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      setPlayer(new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          start: savedTimestamp,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      }));
    };

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    
    // If there's a saved timestamp, seek to it
    if (savedTimestamp > 0) {
      event.target.seekTo(savedTimestamp);
    }
  };

  const onPlayerStateChange = (event) => {
    // Player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering)
    setIsPlaying(event.data === 1);
    
    if (event.data === 1) { // Playing
      // Start tracking time
      const interval = setInterval(() => {
        if (player && player.getCurrentTime) {
          const time = player.getCurrentTime();
          setCurrentTime(time);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    
    if (event.data === 2) { // Paused
      // Save current time to history
      if (player && player.getCurrentTime) {
        const time = player.getCurrentTime();
        saveToHistory(time);
      }
    }
    
    if (event.data === 0) { // Ended
      // Save as completed (timestamp 0 means fully watched)
      saveToHistory(0);
    }
  };

  const onPlayerError = (error) => {
    console.error('YouTube Player Error:', error);
  };

  // Handle manual seek
  const handleSeek = (seconds) => {
    if (player && player.seekTo) {
      player.seekTo(seconds);
      setCurrentTime(seconds);
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
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="relative pb-[56.25%] bg-dark-900 rounded-2xl overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-800 to-dark-900"></div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-dark-800 rounded-full w-3/4 animate-pulse"></div>
          <div className="h-4 bg-dark-800 rounded-full w-1/2 animate-pulse"></div>
          <div className="flex space-x-4">
            <div className="h-10 bg-dark-800 rounded-full w-24 animate-pulse"></div>
            <div className="h-10 bg-dark-800 rounded-full w-24 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Video Player */}
      <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden bg-dark-900 
                      shadow-2xl shadow-black/50 border border-dark-800">
        <div id="youtube-player" className="absolute top-0 left-0 w-full h-full"></div>
        
        {/* Progress Indicator (optional) */}
        {duration > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs 
                        px-2 py-1 rounded-full flex items-center gap-2">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            {savedTimestamp > 0 && (
              <span className="text-green-400" title="Resumed from where you left off">
                ▶️ Resumed
              </span>
            )}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="glass-effect rounded-2xl p-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{video.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-purple 
                            rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {video.channelTitle?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{video.channelTitle}</h3>
                <p className="text-sm text-gray-400">Educational Channel</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 
                         rounded-lg transition-all duration-300 border border-dark-700
                         hover:border-accent-blue/50 group relative"
              >
                <FaShare className="text-gray-400 group-hover:text-accent-blue" />
                <span className="text-gray-300">Share</span>
                {showShare && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                                   bg-green-500 text-white text-sm px-3 py-1 rounded-lg
                                   animate-bounce-slow">
                    Copied!
                  </span>
                )}
              </button>
              
              <a 
                href={`https://youtu.be/${videoId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 
                         rounded-lg transition-all duration-300 border border-dark-700
                         hover:border-accent-purple/50 group"
              >
                <FaExternalLinkAlt className="text-gray-400 group-hover:text-accent-purple" />
                <span className="text-gray-300">Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-800/50 rounded-xl p-4 text-center">
            <FaEye className="text-accent-blue text-xl mx-auto mb-2" />
            <div className="text-xl font-bold">{formatNumber(video.viewCount)}</div>
            <div className="text-xs text-gray-400">Views</div>
          </div>
          
          <div className="bg-dark-800/50 rounded-xl p-4 text-center">
            <FaThumbsUp className="text-accent-green text-xl mx-auto mb-2" />
            <div className="text-xl font-bold">{formatNumber(video.likeCount)}</div>
            <div className="text-xs text-gray-400">Likes</div>
          </div>
          
          <div className="bg-dark-800/50 rounded-xl p-4 text-center">
            <FaCalendar className="text-accent-purple text-xl mx-auto mb-2" />
            <div className="text-sm font-bold">{formatDate(video.publishedAt)}</div>
            <div className="text-xs text-gray-400">Published</div>
          </div>
          
          <div className="bg-dark-800/50 rounded-xl p-4 text-center">
            <FaCheckCircle className="text-accent-green text-xl mx-auto mb-2" />
            <div className="text-sm font-bold">Verified</div>
            <div className="text-xs text-gray-400">Educational Channel</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-dark-800/30 rounded-xl p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent-blue rounded-full"></span>
            Description
          </h3>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {video.description || 'No description available for this video.'}
          </p>
        </div>
      </div>

      {/* More from channel */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-gradient">More from</span>
          <span>{video.channelTitle}</span>
        </h2>
        <Link 
          to={`/search?q=${encodeURIComponent(video.channelTitle)}`}
          className="inline-block px-6 py-3 bg-dark-800 hover:bg-dark-700 
                   rounded-lg transition-all duration-300 border border-dark-700
                   hover:border-accent-blue/50 group"
        >
          Browse more videos from this channel →
        </Link>
      </div>
    </div>
  );
};

export default Watch;