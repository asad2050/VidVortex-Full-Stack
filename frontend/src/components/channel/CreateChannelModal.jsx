import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Avatar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/slices/authSlice';
import { setChannel } from '../../store/slices/channelSlice';
import API from '../../api/axios';

const CreateChannelModal = ({ open, onClose, username }) => {
  const [channelName, setChannelName] = useState(username || '');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCreate = async () => {
    try {
      setLoading(true);
      const response = await API.post('/channels', { channelName, description });
      dispatch(setChannel(response.data));
      dispatch(updateUser({ channelId: response.data._id }));
      onClose();
    } catch (err) {
      console.error('Create channel error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{ sx: { bgcolor: '#1f1f1f', color: '#fff', minWidth: '400px' } }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>How you'll appear</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#ff0000', mb: 2 }}>
            {channelName?.[0]?.toUpperCase()}
          </Avatar>
          <TextField
            fullWidth
            label="Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            margin="normal"
            sx={{ input: { color: '#fff' }, label: { color: '#aaa' } }}
          />
          <Typography variant="caption" sx={{ color: '#aaa', mt: 1 }}>
            By clicking Create Channel, you agree to VidVortex's Terms of Service.
          </Typography>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            sx={{ textarea: { color: '#fff' }, label: { color: '#aaa' } }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: '#fff' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleCreate} 
          disabled={!channelName || loading}
          sx={{ borderRadius: '20px', bgcolor: '#3ea6ff', color: '#000' }}
        >
          Create Channel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateChannelModal;
