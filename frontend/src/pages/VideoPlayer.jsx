import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box, Typography, Stack, Avatar, Divider, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Header from '../components/layout/Header';
import VideoGrid from '../components/video/VideoGrid';
import CommentSection from '../components/comments/CommentSection';
import LikeDislikeButtons from '../components/common/LikeDislikeButtons';
import Loader from '../components/common/Loader';
import API from '../api/axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const videoRes = await API.get(`/videos/${id}`);
        setVideo(videoRes.data);
        
        const relatedRes = await API.get('/videos');
        const relatedData = Array.isArray(relatedRes.data) ? relatedRes.data : [];
        setRelatedVideos(relatedData.filter(v => v._id !== id));
      } catch (err) {
        console.error('Error fetching video data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Loader />
    </Box>
  );
  
  if (!video) return <div>Video not found</div>;

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#fff' }}>
      <Header />
      <Grid container spacing={3} sx={{ p: { xs: 1, md: 4 } }}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ width: '100%', position: 'sticky', top: '80px' }}>
            <Box sx={{ aspectRatio: '16/9', bgcolor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
              <ReactPlayer 
                url={video.videoUrl} 
                controls 
                width="100%" 
                height="100%" 
                playing={true}
              />
            </Box>
            
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              {video.title}
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              justifyContent="space-between" 
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
              sx={{ mt: 2, mb: 2 }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Link to={`/channel/${video.channelId?._id || video.channelId}`}>
                  <Avatar src={video.channelId?.channelAvatar} sx={{ width: 40, height: 40 }}>
                    {video.channelName?.[0]}
                  </Avatar>
                </Link>
                <Box>
                  <Link 
                    to={`/channel/${video.channelId?._id || video.channelId}`} 
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                      {video.channelName}
                      <CheckCircle sx={{ fontSize: '14px', ml: 0.5, color: '#aaa' }} />
                    </Typography>
                  </Link>
                  <Typography variant="body2" sx={{ color: '#aaa' }}>
                    {video.channelId?.subscribers?.toLocaleString() || 0} subscribers
                  </Typography>
                </Box>
              </Stack>
              
              <LikeDislikeButtons 
                videoId={video._id} 
                initialLikes={video.likes} 
                initialDislikes={video.dislikes} 
              />
            </Stack>
            
            <Box sx={{ bgcolor: '#1f1f1f', p: 2, borderRadius: '12px', mb: 4 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {video.views?.toLocaleString()} views • {new Date(video.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {video.description}
              </Typography>
            </Box>
            
            <Divider sx={{ bgcolor: '#333' }} />
            
            <CommentSection videoId={video._id} initialComments={video.comments} />
          </Box>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Related Videos</Typography>
          <VideoGrid videos={relatedVideos} loading={false} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoPlayer;
