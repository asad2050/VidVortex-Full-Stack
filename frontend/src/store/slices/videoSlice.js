import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCurrentVideo: (state) => {
      state.currentVideo = null;
    },
  },
});

export const { setVideos, setCurrentVideo, setLoading, setError, clearCurrentVideo } = videoSlice.actions;
export default videoSlice.reducer;
