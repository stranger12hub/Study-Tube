import mongoose from 'mongoose';

const cachedSearchSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    trim: true
  },
  results: [{
    videoId: String,
    title: String,
    description: String,
    thumbnail: String,
    channelId: String,
    channelTitle: String,
    publishedAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // TTL: 24 hours in seconds
  }
});

// Ensure unique query to prevent duplicates
cachedSearchSchema.index({ query: 1 }, { unique: true });

export default mongoose.model('CachedSearch', cachedSearchSchema);