import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaThumbsUp, FaCalendar, FaShare, FaExternalLinkAlt, FaRedoAlt, FaCheckCircle } from 'react-icons/fa';
import Button from '../components/Button';

const Watch = () => {
  const { videoId } = useParams();
  const [searchParams] = useSearchParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  
  const playerRef = useRef(null);
  const playerReadyRef = useRef(false);
  const saveIntervalRef = useRef(null);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = initPlayer;
      document.body.appendChild(tag);
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    }
  }, [video]);

  // Save progress every 5 seconds
  useEffect(() => {
    if (!playerReadyRef.current) return;

    saveIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime > 0) {
          localStorage.setItem(`video-progress-${videoId}`, Math.floor(currentTime).toString());
          
          // Also update history with timestamp
          updateHistoryTimestamp(Math.floor(currentTime));
        }
      }
    }, 5000);

    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, [videoId, playerReadyRef.current]);

  // Function to update history with timestamp
  const updateHistoryTimestamp = (timestamp) => {
    try {
      const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
      const updatedHistory = history.map(item => {
        if (item.videoId === videoId) {
          return {
            ...item,
            timestamp: timestamp,
            lastWatched: new Date().toISOString()
          };
        }
        return item;
      });
      localStorage.setItem('studytube-watch-history', JSON.stringify(updatedHistory));
      window.dispatchEvent(new Event('videoWatched'));
    } catch (e) {
      console.error('Error updating history:', e);
    }
  };

  // Save to history when video loads
  const saveToHistory = (videoData) => {
    try {
      const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
      
      const existingIndex = history.findIndex(item => item.videoId === videoId);
      
      const newEntry = {
        videoId: videoId,
        title: videoData.title,
        thumbnail: videoData.thumbnail,
        channelTitle: videoData.channelTitle,
        timestamp: 0,
        lastWatched: new Date().toISOString()
      };
      
      let updatedHistory;
      if (existingIndex !== -1) {
        updatedHistory = [...history];
        updatedHistory[existingIndex] = newEntry;
      } else {
        updatedHistory = [newEntry, ...history];
      }
      
      const trimmed = updatedHistory.slice(0, 50);
      localStorage.setItem('studytube-watch-history', JSON.stringify(trimmed));
      window.dispatchEvent(new Event('videoWatched'));
    } catch (e) {
      console.error('Error saving to history:', e);
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/search/video/${videoId}`);
        setVideo(response.data);
        
        saveToHistory(response.data);
        
        const savedTime = localStorage.getItem(`video-progress-${videoId}`);
        const urlTime = searchParams.get('t');
        
        if (urlTime) {
          setResumeTime(parseInt(urlTime));
        } else if (savedTime) {
          setResumeTime(parseInt(savedTime));
          setShowResumePrompt(true);
        }
        
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const initPlayer = () => {
    if (!playerRef.current && window.YT && window.YT.Player && video) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          start: resumeTime
        },
        events: {
          onReady: () => {
            playerReadyRef.current = true;
          },
          onStateChange: (event) => {
            if (event.data === 0) {
              localStorage.removeItem(`video-progress-${videoId}`);
              updateHistoryTimestamp(0);
            }
            if (event.data === 2 && playerRef.current) {
              const currentTime = playerRef.current.getCurrentTime();
              if (currentTime > 0) {
                localStorage.setItem(`video-progress-${videoId}`, Math.floor(currentTime).toString());
                updateHistoryTimestamp(Math.floor(currentTime));
              }
            }
          }
        }
      });
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
      updateHistoryTimestamp(0);
    }
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
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
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="aspect-video bg-[#1a1a1a] rounded-2xl animate-pulse" />
        <div className="mt-6 space-y-4">
          <div className="h-8 bg-[#1a1a1a] rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-[#1a1a1a] rounded-lg w-1/2 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-[#1a1a1a] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4 animate-bounce">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Video Unavailable</h2>
          <p className="text-secondary mb-6">{error || 'Could not load video'}</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Video Player Container */}
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
        <div id="youtube-player" className="w-full h-full" />
        
        {/* Resume Prompt */}
        {showResumePrompt && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                        bg-[#141414] border border-primary rounded-xl 
                        shadow-2xl p-4 flex items-center gap-4 z-10
                        animate-slideUp">
            <p className="text-white">
              Resume from <span className="text-primary font-semibold">
                {formatTime(resumeTime)}
              </span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleResume}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm
                         hover:bg-primary-hover hover:scale-105 active:scale-95
                         transition-all duration-300"
              >
                Resume
              </button>
              <button
                onClick={handleStartOver}
                className="px-4 py-2 bg-[#2a2a2a] text-white rounded-lg text-sm
                         hover:bg-[#3a3a3a] hover:scale-105 active:scale-95
                         transition-all duration-300 flex items-center gap-1"
              >
                <FaRedoAlt size={12} /> Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Info Section */}
      <div className="mt-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {video.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center
                            shadow-lg shadow-primary/30">
                <span className="text-white font-bold text-lg">
                  {video.channelTitle?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{video.channelTitle}</h3>
                <p className="text-sm text-secondary flex items-center gap-1">
                  <FaCheckCircle className="text-primary" size={12} />
                  Educational Channel
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl
                         text-secondary hover:text-white hover:border-primary
                         hover:scale-105 active:scale-95 transition-all duration-300
                         relative"
              >
                <FaShare className="inline mr-2" size={14} />
                Share
                {showShare && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2
                                 bg-primary text-white text-sm px-3 py-1 rounded-lg
                                 animate-slideUp">
                    Copied!
                  </span>
                )}
              </button>
              
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl
                         text-secondary hover:text-white hover:border-primary
                         hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <FaExternalLinkAlt className="inline mr-2" size={14} />
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center
                        hover:border-primary transition-all duration-300 group">
            <FaEye className="text-primary text-xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-lg font-bold text-white">
              {formatNumber(video.viewCount)}
            </div>
            <div className="text-xs text-secondary">Views</div>
          </div>
          
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center
                        hover:border-primary transition-all duration-300 group">
            <FaThumbsUp className="text-primary text-xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-lg font-bold text-white">
              {formatNumber(video.likeCount)}
            </div>
            <div className="text-xs text-secondary">Likes</div>
          </div>
          
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center
                        hover:border-primary transition-all duration-300 group">
            <FaCalendar className="text-primary text-xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-bold text-white">
              {new Date(video.publishedAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-secondary">Published</div>
          </div>
          
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center
                        hover:border-primary transition-all duration-300 group">
            <div className="text-xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">✓</div>
            <div className="text-sm font-bold text-white">Verified</div>
            <div className="text-xs text-secondary">Channel</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6
                      hover:border-primary/30 transition-all duration-300">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full" />
            Description
          </h3>
          <p className="text-secondary whitespace-pre-wrap leading-relaxed">
            {video.description || 'No description available for this video.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Watch;