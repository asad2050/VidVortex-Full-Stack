import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Container } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import GuestPrompt from '../components/common/GuestPrompt';
import VideoGrid from '../components/video/VideoGrid';
import Loader from '../components/common/Loader';
import { useAuth } from '../hooks/useAuth';
import API from '../api/axios';

const LikedVideos = () => {
  const { isLoggedIn } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchLikedVideos = async () => {
      try {
        setLoading(true);
        const response = await API.get('/videos/liked');
        setVideos(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching liked videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
        <Header />
        <Stack direction="row">
          <Sidebar />
          <Box sx={{ flex: 1, p: 2 }}>
            <GuestPrompt 
              icon={<ThumbUp sx={{ fontSize: 100 }} />}
              title="Enjoy your favorite videos"
              message="Sign in to access videos that you've liked"
            />
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#fff' }}>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
          {loading ? (
            <Loader />
          ) : (
            <Container maxWidth="xl">
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Liked Videos</Typography>
              {videos.length > 0 ? (
                <VideoGrid videos={videos} loading={false} />
              ) : (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <ThumbUp sx={{ fontSize: 80, color: '#333', mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 1 }}>No liked videos yet</Typography>
                  <Typography sx={{ color: '#aaa' }}>Videos you like will appear here.</Typography>
                </Box>
              )}
            </Container>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default LikedVideos;
