import CachedSearch from '../models/CachedSearch.js';
import youtubeService from '../services/youtubeService.mjs';

export const searchVideos = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    const query = q.trim().toLowerCase();

    // Check cache first
    const cached = await CachedSearch.findOne({ query });
    
    if (cached) {
      console.log('Returning cached results for:', query);
      return res.json({
        fromCache: true,
        results: cached.results
      });
    }

    // Fetch from YouTube API
    console.log('Fetching from YouTube API for:', query);
    const results = await youtubeService.searchVideos(query);

    // Store in cache
    if (results.length > 0) {
      await CachedSearch.findOneAndUpdate(
        { query },
        { 
          query,
          results,
          createdAt: new Date()
        },
        { upsert: true, new: true }
      );
    }

    res.json({
      fromCache: false,
      results
    });
  } catch (error) {
    next(error);
  }
};

export const getVideoDetails = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    
    if (!videoId) {
      return res.status(400).json({ message: 'Video ID is required' });
    }

    // Check if video is from allowed channel before fetching details
    const videoDetails = await youtubeService.getVideoDetails(videoId);
    
    if (!videoDetails) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Verify channel is allowed
    const ALLOWED_CHANNELS = new Set([
      'UCcsF8_zRfgaWu-Es7km-_3w',
      'UC612F5u4pfDEB7uVVGsxduQ',
      'UCb54c7V9X5R0ri5cemHnWOg',
      'UCvu9_r5iMlL6e_Ymq31b4DA',
      'UC7CTVCf17-qzD5GES3UIuwg',
      'UCsVhLyoBpasnmXfGRlQfXgQ',
      'UCAgW8zMVvgFtKxTqOyzlfJA',
      'UCVJc7bS5lP8OrZGd7vs_yHw'
    ]);

    if (!ALLOWED_CHANNELS.has(videoDetails.channelId)) {
      return res.status(403).json({ message: 'Video from unauthorized channel' });
    }

    res.json(videoDetails);
  } catch (error) {
    next(error);
  }
};