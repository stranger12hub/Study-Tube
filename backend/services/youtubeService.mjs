import axios from 'axios';

// Don't try to access process.env at the top level
// We'll create a function to get the API key when needed

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

class YouTubeService {
  constructor() {
    // We'll get the API key when methods are called
    console.log('YouTube Service Initialized (lazy loading API key)');
  }

  getApiKey() {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) {
      console.error('❌ YouTube API Key not found in environment variables!');
    }
    return key;
  }

  async searchVideos(query, maxResults = 20) {
    try {
      const API_KEY = this.getApiKey();
      console.log(`\n🔍 Searching for: "${query}"`);
      console.log('API Key present:', API_KEY ? 'YES' : 'NO');
      
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          maxResults: maxResults,
          key: API_KEY
        }
      });

      console.log('✅ API call successful! Found:', response.data.items.length, 'videos total');
      console.log('\n--- Channel Filtering Debug ---');

      const filteredVideos = response.data.items
        .filter(item => {
          const channelId = item.snippet.channelId;
          const channelTitle = item.snippet.channelTitle;
          const isAllowed = ALLOWED_CHANNELS.has(channelId);
          
          if (isAllowed) {
            console.log('✅ KEPT - Allowed channel:', channelTitle, '(ID:', channelId, ')');
            console.log('   Video:', item.snippet.title);
          } else {
            console.log('❌ FILTERED OUT - Channel:', channelTitle, '(ID:', channelId, ')');
          }
          return isAllowed;
        })
        .map(item => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt
        }));

      console.log('\n--- Filtering Summary ---');
      console.log(`✅ Videos from allowed channels: ${filteredVideos.length}`);
      console.log('------------------------\n');

      return filteredVideos;
    } catch (error) {
      console.error('❌ ERROR in YouTube API call:');
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', JSON.stringify(error.response.data, null, 2));
      } else {
        console.error(error.message);
      }
      throw new Error('Failed to fetch from YouTube API');
    }
  }

  async getVideoDetails(videoId) {
    try {
      const API_KEY = this.getApiKey();
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,statistics',
          id: videoId,
          key: API_KEY
        }
      });

      if (!response.data.items.length) return null;

      const video = response.data.items[0];
      return {
        videoId: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount
      };
    } catch (error) {
      console.error('❌ YouTube API error:', error.response?.data || error.message);
      throw new Error('Failed to fetch video details');
    }
  }
}

export default new YouTubeService();