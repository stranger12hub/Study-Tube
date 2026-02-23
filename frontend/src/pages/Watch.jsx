import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaThumbsUp, FaCalendar, FaShare, FaExternalLinkAlt } from 'react-icons/fa';
import Button from '../components/Button';

const Watch = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/search/video/${videoId}`);
        setVideo(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
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
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
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