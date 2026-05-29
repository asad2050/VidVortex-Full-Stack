import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { useAuth } from '../../hooks/useAuth';
import API from '../../api/axios';

const CommentSection = ({ videoId, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const { user } = useAuth();

  const handleAddComment = async (text) => {
    try {
      const response = await API.post(`/comments/${videoId}`, { text });
      setComments(response.data);
    } catch (err) {
      console.error('Add comment error:', err);
    }
  };

  const handleEditComment = async (commentId, text) => {
    try {
      const response = await API.put(`/comments/${videoId}/${commentId}`, { text });
      setComments(response.data);
    } catch (err) {
      console.error('Edit comment error:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await API.delete(`/comments/${videoId}/${commentId}`);
      setComments(response.data);
    } catch (err) {
      console.error('Delete comment error:', err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        {comments.length} Comments
      </Typography>
      
      <CommentForm onSubmit={handleAddComment} />
      
      <Box>
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            currentUserId={user?._id}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CommentSection;
