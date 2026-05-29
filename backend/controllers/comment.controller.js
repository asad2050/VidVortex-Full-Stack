import Video from '../models/Video.js';

export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const newComment = {
      userId: req.user.id,
      username: req.user.username,
      text
    };

    video.comments.push(newComment);
    await video.save();

    res.status(201).json(video.comments);
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { videoId, commentId } = req.params;
    const { text } = req.body;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Only author can update comment' });

    comment.text = text;
    await video.save();

    res.status(200).json(video.comments);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { videoId, commentId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Only author can delete comment' });

    video.comments.pull(commentId);
    await video.save();

    res.status(200).json(video.comments);
  } catch (err) {
    next(err);
  }
};
