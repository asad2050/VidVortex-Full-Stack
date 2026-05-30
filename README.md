# VidVortex YouTube Clone — MERN Stack

[View on GitHub](https://github.com/asad2050/VidVortex-Full-Stack)

A full-stack YouTube clone with viewer and creator features, built with the MERN stack.

## 🚀 Features

- **Browse & Search:** Explore videos by category or search by title.
- **Video Player:** High-quality video playback using `react-player`.
- **Authentication:** Secure user registration and login with JWT.
- **Creator Channel:** Users can create their own channel, upload videos, and manage their content.
- **Engagement:** Like/dislike videos and comment on them.
- **Responsive Design:** Fully responsive UI built with Material UI v5.
- **Cloud Storage:** Media files (images and videos) are managed via Cloudinary.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, BcryptJS, Multer, Cloudinary.
- **Frontend:** React 18, Vite, Redux Toolkit, React Router v6, Material UI v5, Axios, React Player.

## 📋 Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd vidvortex
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Seed the Database
To quickly populate the application with sample data (Users, Channels, and Videos), run the following command. This is highly recommended for first-time use to see the app in its fully functional state:
```bash
node seed.js
```
*(Note: If you have already removed the seed script for production, ensure you have manually created or imported your initial collections.)*

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## 🛣️ API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/videos` | Get all videos (search/filter) | No |
| GET | `/api/videos/:id` | Get video by ID | No |
| POST | `/api/videos` | Upload a new video | Yes |
| PUT | `/api/videos/:id` | Update video details | Yes |
| DELETE | `/api/videos/:id` | Delete a video | Yes |
| PUT | `/api/videos/:id/like` | Like/Unlike a video | Yes |
| PUT | `/api/videos/:id/dislike` | Dislike/Un-dislike a video | Yes |
| POST | `/api/channels` | Create a channel | Yes |
| GET | `/api/channels/:id` | Get channel details | No |
| POST | `/api/comments/:videoId` | Add a comment | Yes |

---
Built as part of the MERN Capstone Project.
