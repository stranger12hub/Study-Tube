import express from 'express';
import { searchVideos, getVideoDetails } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchVideos);
router.get('/video/:videoId', getVideoDetails);

export default router;
