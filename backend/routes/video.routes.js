import express from 'express';
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getSubscribedVideos,
  getLikedVideos
} from '../controllers/video.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get('/', getAllVideos);
router.get('/subscribed', verifyToken, getSubscribedVideos);
router.get('/liked', verifyToken, getLikedVideos);
router.get('/:id', getVideoById);

router.post('/', verifyToken, upload.fields([
  { name: 'thumbnailUrl', maxCount: 1 },
  { name: 'videoUrl', maxCount: 1 }
]), createVideo);

router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.put('/:id/like', verifyToken, likeVideo);
router.put('/:id/dislike', verifyToken, dislikeVideo);

export default router;
