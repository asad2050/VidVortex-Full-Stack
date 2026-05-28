import Channel from '../models/Channel.js';
import User from '../models/User.js';

export const createChannel = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.channelId) return res.status(400).json({ message: 'User already has a channel' });

    const { channelName, description } = req.body;
    const handle = `@${channelName.replace(/\s+/g, '').toLowerCase()}${Math.random().toString(36).slice(2, 6)}`;

    const newChannel = new Channel({
      channelName,
      description,
      handle,
      owner: req.user.id
    });

    const savedChannel = await newChannel.save();
    await User.findByIdAndUpdate(req.user.id, { channelId: savedChannel._id });

    res.status(201).json(savedChannel);
  } catch (err) {
    next(err);
  }
};

export const getChannelById = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id).populate({
      path: 'videos',
      options: { sort: { createdAt: -1 } }
    });
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    res.status(200).json(channel);
  } catch (err) {
    next(err);
  }
};

export const subscribeChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    const userId = req.user.id;
    if (channel.owner.toString() === userId) {
      return res.status(400).json({ message: 'You cannot subscribe to your own channel' });
    }

    // Ensure subscribers is an array (handles legacy data)
    if (!Array.isArray(channel.subscribers)) {
      channel.subscribers = [];
    }

    if (channel.subscribers.includes(userId)) {
      channel.subscribers.pull(userId);
    } else {
      channel.subscribers.push(userId);
    }

    await channel.save();
    res.status(200).json({ 
      subscribers: channel.subscribers.length, 
      isSubscribed: channel.subscribers.includes(userId) 
    });
  } catch (err) {
    next(err);
  }
};

export const getSubscribedChannels = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const channels = await Channel.find({ subscribers: userId });
    res.status(200).json(channels);
  } catch (err) {
    next(err);
  }
};

export const updateChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    if (channel.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Only owner can update channel' });

    const { channelName, description } = req.body;
    
    // Handle file uploads from req.files
    const channelAvatar = req.files?.['channelAvatar']?.[0]?.path || req.body.channelAvatar;
    const channelBanner = req.files?.['channelBanner']?.[0]?.path || req.body.channelBanner;

    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          channelName, 
          description, 
          channelAvatar, 
          channelBanner 
        } 
      },
      { returnDocument: 'after' }
    );

    // Cascade update channelName to all videos if it has changed
    if (channelName) {
      await Video.updateMany(
        { channelId: req.params.id },
        { $set: { channelName } }
      );
    }

    res.status(200).json(updatedChannel);
  } catch (err) {
    next(err);
  }
};

import Video from '../models/Video.js';

export const deleteChannel = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    if (channel.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Only owner can delete channel' });

    // Delete all videos associated with this channel
    await Video.deleteMany({ channelId: req.params.id });

    // Remove channelId from the user
    await User.findByIdAndUpdate(req.user.id, { $set: { channelId: null } });

    // Delete the channel itself
    await Channel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Channel and all associated videos deleted' });
  } catch (err) {
    next(err);
  }
};
