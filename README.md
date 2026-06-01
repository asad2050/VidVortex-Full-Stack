# VidVortex YouTube Clone — MERN Stack

[View on GitHub](https://github.com/asad2050/VidVortex-Full-Stack)

[Live Demo](https://vid-vortex-full-stack.vercel.app/)

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
The database consists of three core collections: `users`, `channels`, and `videos`. To test the application locally, you can easily import the provided sample datasets into your MongoDB instance using **MongoDB Compass**.

### Prerequisites
Make sure you have downloaded the three JSON seed files located in the project folder:
* `vidvortex.users.json`
* `vidvortex.channels.json`
* `vidvortex.videos.json`

### Step-by-Step Import Guide

1. Open **MongoDB Compass** and connect to your local database cluster.
2. Create a new database named **`vidvortex`** (or select it if it already exists).
3. Follow these steps for each of the three collections:

   #### 1. Import Users
   * Click **Create Collection** and name it `users`.
   * Open the `users` collection, and click the **Add Data** dropdown button near the top.
   * Select **Import JSON or CSV file**.
   * Browse and select your local `vidvortex.users.json` file. Ensure the file type is set to **JSON**.
   * Click **Import**.

   #### 2. Import Channels
   * Click the **`+`** icon next to your database name to create a new collection named `channels`.
   * Open the `channels` collection, click **Add Data** -> **Import JSON or CSV file**.
   * Choose the `vidvortex.channels.json` file and click **Import**.

   #### 3. Import Videos
   * Create a final collection named `videos`.
   * Open it, click **Add Data** -> **Import JSON or CSV file**.
   * Choose the `vidvortex.videos.json` file and click **Import**.

⚠️ **Important Note:** To test authenticated user features seamlessly, make sure you complete the database import before attempting to log into the frontend.

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
