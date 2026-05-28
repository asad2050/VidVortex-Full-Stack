import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === 'thumbnailUrl' || file.mimetype.startsWith('image/')) {
      return {
        folder: 'youtube-clone/images',
        allowed_formats: ['jpg', 'png', 'webp'],
        resource_type: 'image'
      };
    }
    
    if (file.fieldname === 'videoUrl' || file.mimetype.startsWith('video/')) {
      return {
        folder: 'youtube-clone/videos',
        allowed_formats: ['mp4', 'mov'],
        resource_type: 'video'
      };
    }

    // Default fallback
    return {
      folder: 'youtube-clone/others',
      resource_type: 'auto'
    };
  }
});

export const upload = multer({ storage });

