import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Video from './models/Video.js';
import Channel from './models/Channel.js';

dotenv.config();

const categories = [
  'Web Development', 'JavaScript', 'Data Structures', 'Music', 'Gaming', 'Science', 'Travel', 'Finance'
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Video.deleteMany({});
    await Channel.deleteMany({});

    // Create test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser'
    });
    const savedUser = await user.save();

    // Create channel
    const channel = new Channel({
      channelName: 'Test Channel',
      handle: '@testchannel',
      owner: savedUser._id,
      description: 'The official test channel for YouTube Clone.',
      channelAvatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=TestChannel'
    });
    const savedChannel = await channel.save();

    // Update user with channelId
    savedUser.channelId = savedChannel._id;
    await savedUser.save();

    // Seed 10 videos
    const videos = [];
    for (let i = 1; i <= 10; i++) {
      const category = categories[i % categories.length];
      const video = new Video({
        title: `Seed Video ${i}: Learning ${category}`,
        description: `This is a comprehensive guide to ${category}. Enjoy this seed data video #${i}!`,
        thumbnailUrl: `https://picsum.photos/seed/${i}/480/270`,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category,
        channelId: savedChannel._id,
        channelName: savedChannel.channelName,
        uploader: savedUser._id,
        views: Math.floor(Math.random() * 499000) + 1000,
        likes: [savedUser._id],
        comments: [
          { userId: savedUser._id, username: savedUser.username, text: 'Great video! Very helpful.' },
          { userId: savedUser._id, username: savedUser.username, text: 'Thanks for sharing this knowledge.' }
        ]
      });
      const savedVideo = await video.save();
      videos.push(savedVideo._id);
    }

    // Update channel with video IDs
    savedChannel.videos = videos;
    await savedChannel.save();

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seedData();
