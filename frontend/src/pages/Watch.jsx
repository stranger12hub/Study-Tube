import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaThumbsUp, FaCalendar, FaShare, FaExternalLinkAlt, FaCheckCircle, FaYoutube, FaRedoAlt } from 'react-icons/fa';

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

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/search/video/${videoId}`);
        setVideo(response.data);
        
        const saved = localStorage.getItem(`progress-${videoId}`);
        const urlTime = searchParams.get('t');
        
        if (urlTime) setResumeTime(parseInt(urlTime));
        else if (saved) {
          setResumeTime(parseInt(saved));
          setShowResumePrompt(true);
        }
      } catch (err) {
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = initPlayer;
      document.body.appendChild(tag);
    } else initPlayer();
  }, [video]);

  const initPlayer = () => {
    if (!playerRef.current && window.YT?.Player && video) {
      playerRef.current = new window.YT.Player('player', {
        videoId: videoId,
        playerVars: { autoplay: 1, controls: 1, modestbranding: 1, rel: 0, start: resumeTime },
        events: {
          onStateChange: (e) => {
            if (e.data === 2) { // Paused
              const time = playerRef.current?.getCurrentTime();
              if (time) localStorage.setItem(`progress-${videoId}`, Math.floor(time).toString());
            }
          }
        }
      });
    }
  };

  const handleResume = () => {
    playerRef.current?.seekTo(resumeTime, true);
    setShowResumePrompt(false);
  };

  const handleStartOver = () => {
    playerRef.current?.seekTo(0, true);
    setShowResumePrompt(false);
    localStorage.removeItem(`progress-${videoId}`);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!video) return <div className="p-8 text-center">Video not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="relative pb-[56.25%] mb-4">
        <div id="player" className="absolute top-0 left-0 w-full h-full"></div>
        {showResumePrompt && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-900 p-4 rounded-lg flex gap-4">
            <span>Resume from {Math.floor(resumeTime / 60)}:{resumeTime % 60}?</span>
            <button onClick={handleResume} className="text-accent-blue">Yes</button>
            <button onClick={handleStartOver}>No</button>
          </div>
        )}
      </div>
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <p className="text-gray-400">{video.channelTitle}</p>
    </div>
  );
};

export default Watch;