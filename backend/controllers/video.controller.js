import Video from '../models/Video.js';
import User from '../models/User.js';
import Channel from '../models/Channel.js';

export const getAllVideos = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All') {
      query.category = category;
    }
    const videos = await Video.find(query).sort({ createdAt: -1 }).populate('channelId', 'channelName channelAvatar');
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { returnDocument: 'after' }
    ).populate('channelId', 'channelName channelAvatar');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user || !user.channelId) {
      return res.status(403).json({ message: 'Create a channel first' });
    }

    const channel = await Channel.findById(user.channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const { title, description, category } = req.body;
    
    // Extract file paths from Multer's req.files object
    const thumbnailUrl = req.files?.['thumbnailUrl']?.[0]?.path || req.body.thumbnailUrl;
    const videoUrl = req.files?.['videoUrl']?.[0]?.path || req.body.videoUrl;

    if (!videoUrl) {
      return res.status(400).json({ message: 'Video file is required' });
    }

    const newVideo = new Video({
      title,
      description,
      category,
      thumbnailUrl,
      videoUrl,
      uploader: userId,
      channelId: user.channelId,
      channelName: channel.channelName
    });

    const savedVideo = await newVideo.save();

    // Push video ID to Channel's videos array
    await Channel.findByIdAndUpdate(user.channelId, {
      $push: { videos: savedVideo._id }
    });

    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Error in createVideo:', error);
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.uploader.toString() !== req.user.id) return res.status(403).json({ message: 'Only owner can update video' });

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: 'after' }
    );
    res.status(200).json(updatedVideo);
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.uploader.toString() !== req.user.id) return res.status(403).json({ message: 'Only owner can delete video' });

    await Video.findByIdAndDelete(req.params.id);
    await Channel.findByIdAndUpdate(video.channelId, { $pull: { videos: req.params.id } });

    res.status(200).json({ message: 'Video deleted' });
  } catch (err) {
    next(err);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const userId = req.user.id;
    let userLiked = false;
    let userDisliked = false;

    if (video.likes.includes(userId)) {
      video.likes.pull(userId);
    } else {
      video.likes.push(userId);
      video.dislikes.pull(userId);
      userLiked = true;
    }

    await video.save();
    res.status(200).json({
      likes: video.likes.length,
      dislikes: video.dislikes.length,
      userLiked,
      userDisliked: video.dislikes.includes(userId)
    });
  } catch (err) {
    next(err);
  }
};

export const dislikeVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const userId = req.user.id;
    let userDisliked = false;

    if (video.dislikes.includes(userId)) {
      video.dislikes.pull(userId);
    } else {
      video.dislikes.push(userId);
      video.likes.pull(userId);
      userDisliked = true;
    }

    await video.save();
    res.status(200).json({
      likes: video.likes.length,
      dislikes: video.dislikes.length,
      userLiked: video.likes.includes(userId),
      userDisliked
    });
  } catch (err) {
    next(err);
  }
};

export const getSubscribedVideos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const subscribedChannels = await Channel.find({ subscribers: userId }).select('_id');
    const channelIds = subscribedChannels.map(c => c._id);
    
    const videos = await Video.find({ channelId: { $in: channelIds } }).sort({ createdAt: -1 }).populate('channelId', 'channelName channelAvatar');
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getLikedVideos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const videos = await Video.find({ likes: userId }).sort({ updatedAt: -1 }).populate('channelId', 'channelName channelAvatar');
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
