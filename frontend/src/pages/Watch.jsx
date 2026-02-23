import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaThumbsUp, FaCalendar, FaShare, FaExternalLinkAlt, FaRedoAlt } from 'react-icons/fa';
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
    // Load YouTube IFrame API
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
    } catch (e) {
      console.error('Error updating history:', e);
    }
  };

  // Save to history when video loads
  const saveToHistory = (videoData) => {
    try {
      const history = JSON.parse(localStorage.getItem('studytube-watch-history') || '[]');
      
      // Check if video already in history
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
        // Update existing entry
        updatedHistory = [...history];
        updatedHistory[existingIndex] = newEntry;
      } else {
        // Add new entry at beginning
        updatedHistory = [newEntry, ...history];
      }
      
      // Keep only last 50 videos
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
        
        // Save to history
        saveToHistory(response.data);
        
        // Check for saved progress
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
            // Video ended (0)
            if (event.data === 0) {
              localStorage.removeItem(`video-progress-${videoId}`);
              updateHistoryTimestamp(0);
            }
            // Video paused (2)
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
      <div className="max-w-5xl mx-auto">
        <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
        <div className="mt-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Unavailable</h2>
          <p className="text-gray-600 mb-4">{error || 'Could not load video'}</p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Video Player */}
      <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
        <div id="youtube-player" className="w-full h-full" />
        
        {/* Resume Prompt */}
        {showResumePrompt && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                        bg-white rounded-lg shadow-xl p-4 flex items-center gap-4 z-10
                        border border-gray-200 animate-fade-in">
            <p className="text-gray-700">
              Resume from <span className="font-semibold text-[#C47A4A]">
                {formatTime(resumeTime)}
              </span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleResume}
                className="px-3 py-1 bg-[#C47A4A] text-white rounded-md text-sm
                         hover:bg-[#b06a3d] transition-colors"
              >
                Resume
              </button>
              <button
                onClick={handleStartOver}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm
                         hover:bg-gray-300 transition-colors flex items-center gap-1"
              >
                <FaRedoAlt size={12} /> Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h1>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C47A4A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {video.channelTitle?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{video.channelTitle}</h3>
              <p className="text-sm text-gray-500">Educational Channel</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700
                       hover:bg-gray-50 transition-colors relative"
            >
              <FaShare className="inline mr-2" />
              Share
              {showShare && (
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2
                                 bg-green-500 text-white text-sm px-3 py-1 rounded">
                  Copied!
                </span>
              )}
            </button>
            
            <a
              href={`https://youtu.be/${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700
                       hover:bg-gray-50 transition-colors"
            >
              <FaExternalLinkAlt className="inline mr-2" />
              YouTube
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <FaEye className="text-[#C47A4A] text-xl mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(video.viewCount)}
            </div>
            <div className="text-xs text-gray-500">Views</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <FaThumbsUp className="text-[#C47A4A] text-xl mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-900">
              {formatNumber(video.likeCount)}
            </div>
            <div className="text-xs text-gray-500">Likes</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <FaCalendar className="text-[#C47A4A] text-xl mx-auto mb-2" />
            <div className="text-sm font-bold text-gray-900">
              {new Date(video.publishedAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">Published</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-[#C47A4A] mb-2">✓</div>
            <div className="text-sm font-bold text-gray-900">Verified</div>
            <div className="text-xs text-gray-500">Channel</div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap">
            {video.description || 'No description available for this video.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Watch;