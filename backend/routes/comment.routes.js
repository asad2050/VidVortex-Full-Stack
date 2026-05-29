import express from 'express';
import { addComment, deleteComment, updateComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/:videoId', verifyToken, addComment);
router.put('/:videoId/:commentId', verifyToken, updateComment);
router.delete('/:videoId/:commentId', verifyToken, deleteComment);

export default router;
