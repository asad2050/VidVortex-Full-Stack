import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Avatar, Divider, Container } from '@mui/material';
import { Subscriptions as SubscriptionsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import GuestPrompt from '../components/common/GuestPrompt';
import VideoGrid from '../components/video/VideoGrid';
import Loader from '../components/common/Loader';
import { useAuth } from '../hooks/useAuth';
import API from '../api/axios';

const Subscriptions = () => {
  const { isLoggedIn } = useAuth();
  const [channels, setChannels] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [channelsRes, videosRes] = await Promise.all([
          API.get('/channels/subscribed'),
          API.get('/videos/subscribed')
        ]);
        setChannels(channelsRes.data);
        setVideos(videosRes.data);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
        <Header />
        <Stack direction="row">
          <Sidebar />
          <Box sx={{ flex: 1, p: 2 }}>
            <GuestPrompt 
              icon={<SubscriptionsIcon sx={{ fontSize: 100 }} />}
              title="Don't miss new videos"
              message="Sign in to see updates from your favorite VidVortex channels"
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
              {channels.length > 0 ? (
                <>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Subscribed Channels</Typography>
                  <Stack direction="row" spacing={4} sx={{ mb: 4, overflowX: 'auto', pb: 2 }}>
                    {channels.map((channel) => (
                      <Link 
                        key={channel._id} 
                        to={`/channel/${channel._id}`} 
                        style={{ textDecoration: 'none', color: '#fff', textAlign: 'center' }}
                      >
                        <Avatar 
                          src={channel.channelAvatar} 
                          sx={{ width: 80, height: 80, mb: 1, mx: 'auto' }}
                        >
                          {channel.channelName[0]}
                        </Avatar>
                        <Typography variant="body2" noWrap sx={{ width: 100 }}>
                          {channel.channelName}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                  <Divider sx={{ bgcolor: '#333', mb: 4 }} />

                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Latest from Subscriptions</Typography>
                  {videos.length > 0 ? (
                    <VideoGrid videos={videos} loading={false} />
                  ) : (
                    <Typography sx={{ color: '#aaa', textAlign: 'center', py: 4 }}>
                      No videos from your subscribed channels yet.
                    </Typography>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <SubscriptionsIcon sx={{ fontSize: 80, color: '#333', mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 1 }}>You haven't subscribed to any channels yet</Typography>
                  <Typography sx={{ color: '#aaa' }}>Channels you subscribe to will show up here.</Typography>
                </Box>
              )}
            </Container>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Subscriptions;
