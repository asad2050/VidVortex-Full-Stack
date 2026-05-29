import { useState } from 'react';
import { Box, Avatar, TextField, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const CommentForm = ({ onSubmit, placeholder = "Add a comment..." }) => {
  const [text, setText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const { user, isLoggedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
      setShowButtons(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setShowButtons(false);
  };

  if (!isLoggedIn) return null;

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <Avatar src={user.avatar} sx={{ bgcolor: '#ff0000' }}>
        {user.username[0].toUpperCase()}
      </Avatar>
      <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1 }}>
        <TextField
          fullWidth
          variant="standard"
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setShowButtons(true)}
          sx={{ input: { color: '#fff' } }}
        />
        {showButtons && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
            <Button size="small" sx={{ color: '#fff' }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              size="small" 
              variant="contained" 
              type="submit"
              disabled={!text.trim()}
              sx={{ borderRadius: '20px', bgcolor: '#3ea6ff', color: '#000' }}
            >
              Comment
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommentForm;
