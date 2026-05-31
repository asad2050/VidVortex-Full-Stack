import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Container, Button } from '@mui/material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ChannelInfo from '../components/channel/ChannelInfo';
import ChannelVideoCard from '../components/channel/ChannelVideoCard';
import CreateChannelModal from '../components/channel/CreateChannelModal';
import EditChannelModal from '../components/channel/EditChannelModal';
import VideoUploadForm from '../components/channel/VideoUploadForm';
import VideoEditForm from '../components/channel/VideoEditForm';
import Loader from '../components/common/Loader';
import { useAuth } from '../hooks/useAuth';
import { updateUser } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import API from '../api/axios';

const ChannelPage = () => {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(id === 'new');
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const isOwner = user?.channelId === id || (id === 'new' && isLoggedIn);

  useEffect(() => {
    if (id === 'new') {
      if (!isLoggedIn) {
        navigate('/login');
      } else if (user?.channelId) {
        navigate(`/channel/${user.channelId}`);
      }
      setLoading(false);
      return;
    }

    const fetchChannel = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/channels/${id}`);
        setChannel(response.data);
      } catch (err) {
        console.error('Error fetching channel:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [id, user?.channelId, isLoggedIn, navigate]);

  const handleUploadSuccess = (newVideo) => {
    const videos = Array.isArray(channel.videos) ? channel.videos : [];
    setChannel({ ...channel, videos: [newVideo, ...videos] });
  };

  const handleUpdateChannel = (updatedChannel) => {
    setChannel({ ...channel, ...updatedChannel });
  };

  const handleDeleteChannel = async () => {
    if (window.confirm('Are you sure you want to delete your channel? All videos will be permanently deleted.')) {
      try {
        await API.delete(`/channels/${id}`);
        dispatch(updateUser({ channelId: null }));
        navigate('/');
      } catch (err) {
        console.error('Delete channel error:', err);
      }
    }
  };

  const handleSubscribe = async () => {
    if (!isLoggedIn) return navigate('/login');
    
    // Optimistic update
    const subscribers = Array.isArray(channel.subscribers) ? channel.subscribers : [];
    const isSubscribed = subscribers.includes(user._id);
    const newSubscribers = isSubscribed 
      ? subscribers.filter(id => id !== user._id)
      : [...subscribers, user._id];
    
    setChannel({ ...channel, subscribers: newSubscribers });

    try {
      await API.put(`/channels/${id}/subscribe`);
    } catch (err) {
      console.error('Error toggling subscription:', err);
      // Revert on error
      setChannel({ ...channel, subscribers: channel.subscribers });
    }
  };

  const handleEditSuccess = (updatedVideo) => {
    const videos = Array.isArray(channel.videos) ? channel.videos : [];
    setChannel({
      ...channel,
      videos: videos.map(v => v._id === updatedVideo._id ? updatedVideo : v)
    });
  };

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await API.delete(`/videos/${videoId}`);
        const videos = Array.isArray(channel.videos) ? channel.videos : [];
        setChannel({
          ...channel,
          videos: videos.filter(v => v._id !== videoId)
        });
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) return (
    <Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Loader />
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
          {channel ? (
            <>
              <ChannelInfo 
                channel={channel} 
                isOwner={isOwner} 
                onUploadClick={() => setOpenUploadModal(true)} 
                onEditClick={() => setOpenEditModal(true)}
                onDeleteClick={handleDeleteChannel}
                onSubscribe={handleSubscribe}
              />
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 3, fontWeight: 'bold' }}>Videos</Typography>
                <Divider sx={{ bgcolor: '#333', mb: 3 }} />
                {channel.videos?.length > 0 ? (
                  channel.videos.map((video) => (
                    <ChannelVideoCard 
                      key={video._id} 
                      video={video} 
                      isOwner={isOwner}
                      onEdit={(v) => setEditingVideo(v)}
                      onDelete={handleDeleteVideo}
                    />
                  ))
                ) : (
                  <Typography sx={{ color: '#aaa', textAlign: 'center', py: 4 }}>No videos uploaded yet.</Typography>
                )}
              </Container>
            </>
          ) : (
            id === 'new' && <Box sx={{ p: 4, textAlign: 'center', color: '#fff' }}>
              <Typography variant="h5">Create your channel to start uploading</Typography>
              <Button 
                variant="contained" 
                onClick={() => setOpenCreateModal(true)}
                sx={{ mt: 2, borderRadius: '20px', bgcolor: '#fff', color: '#000' }}
              >
                Create Channel
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <CreateChannelModal 
        open={openCreateModal} 
        onClose={() => {
          setOpenCreateModal(false);
          if (id === 'new' && !user?.channelId) navigate('/');
        }} 
        username={user?.username}
      />

      <EditChannelModal 
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        channel={channel}
        onUpdate={handleUpdateChannel}
      />

      <VideoUploadForm 
        open={openUploadModal} 
        onClose={() => setOpenUploadModal(false)}
        onSuccess={handleUploadSuccess}
      />

      <VideoEditForm 
        open={Boolean(editingVideo)}
        video={editingVideo}
        onClose={() => setEditingVideo(null)}
        onSuccess={handleEditSuccess}
      />
    </Box>
  );
};

export default ChannelPage;
