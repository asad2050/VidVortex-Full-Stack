import express from 'express';
import { 
  createChannel, 
  getChannelById, 
  subscribeChannel, 
  getSubscribedChannels,
  updateChannel,
  deleteChannel
} from '../controllers/channel.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', verifyToken, createChannel);
router.get('/subscribed', verifyToken, getSubscribedChannels);
router.get('/:id', getChannelById);
router.put('/:id', verifyToken, upload.fields([
  { name: 'channelAvatar', maxCount: 1 },
  { name: 'channelBanner', maxCount: 1 }
]), updateChannel);
router.delete('/:id', verifyToken, deleteChannel);
router.put('/:id/subscribe', verifyToken, subscribeChannel);

export default router;
