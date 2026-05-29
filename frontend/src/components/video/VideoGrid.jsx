import { Grid, Box, Typography, Skeleton } from '@mui/material';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos, loading }) => {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[...Array(8)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: '16/9', borderRadius: '12px' }} />
            <Box sx={{ pt: 1, display: 'flex', gap: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="#aaa">No videos found</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
          <VideoCard video={video} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoGrid;
