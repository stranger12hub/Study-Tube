import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;
console.log('API Key (first 10 chars):', API_KEY ? API_KEY.substring(0, 10) + '...' : 'NOT FOUND');
console.log('API Key length:', API_KEY ? API_KEY.length : 0);

const testSearch = async () => {
  try {
    console.log('\nTesting YouTube API...');
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: 'javascript tutorial',
        type: 'video',
        maxResults: 1,
        key: API_KEY
      }
    });
    console.log('✅ SUCCESS! API is working');
    console.log('Found video:', response.data.items[0].snippet.title);
    console.log('Channel:', response.data.items[0].snippet.channelTitle);
  } catch (error) {
    console.log('❌ ERROR:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log(error.message);
    }
  }
};

testSearch();