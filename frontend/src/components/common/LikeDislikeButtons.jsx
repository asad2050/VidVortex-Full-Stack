import { useState } from 'react';
import { Box, IconButton, Typography, Snackbar, Alert } from '@mui/material';
import { ThumbUp, ThumbDown, ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import API from '../../api/axios';

const LikeDislikeButtons = ({ videoId, initialLikes = [], initialDislikes = [] }) => {
  const { user, isLoggedIn } = useAuth();
  const [likes, setLikes] = useState(initialLikes.length);
  const [dislikes, setDislikes] = useState(initialDislikes.length);
  const [userLiked, setUserLiked] = useState(initialLikes.includes(user?._id));
  const [userDisliked, setUserDisliked] = useState(initialDislikes.includes(user?._id));
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLike = async () => {
    if (!isLoggedIn) return setOpenSnackbar(true);
    
    try {
      const response = await API.put(`/videos/${videoId}/like`);
      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setUserLiked(response.data.userLiked);
      setUserDisliked(response.data.userDisliked);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleDislike = async () => {
    if (!isLoggedIn) return setOpenSnackbar(true);

    try {
      const response = await API.put(`/videos/${videoId}/dislike`);
      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setUserLiked(response.data.userLiked);
      setUserDisliked(response.data.userDisliked);
    } catch (err) {
      console.error('Dislike error:', err);
    }
  };

  return (
    <Box sx={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      bgcolor: '#272727', 
      borderRadius: '20px', 
      overflow: 'hidden' 
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, borderRight: '1px solid #444' }}>
        <IconButton onClick={handleLike} color="inherit" sx={{ p: 1 }}>
          {userLiked ? <ThumbUp fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: 'bold', pr: 1 }}>{likes}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
        <IconButton onClick={handleDislike} color="inherit" sx={{ p: 1 }}>
          {userDisliked ? <ThumbDown fontSize="small" /> : <ThumbDownOutlined fontSize="small" />}
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: 'bold', pr: 1 }}>{dislikes}</Typography>
      </Box>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info">Sign in to like this video</Alert>
      </Snackbar>
    </Box>
  );
};

export default LikeDislikeButtons;
