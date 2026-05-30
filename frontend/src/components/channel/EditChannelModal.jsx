import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Avatar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/slices/authSlice';
import API from '../../api/axios';

const EditChannelModal = ({ open, onClose, channel, onUpdate }) => {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (channel) {
      setChannelName(channel.channelName);
      setDescription(channel.description || '');
    }
  }, [channel]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('channelName', channelName);
      formData.append('description', description);
      if (avatar) formData.append('channelAvatar', avatar);
      if (banner) formData.append('channelBanner', banner);

      const response = await API.put(`/channels/${channel._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onUpdate(response.data);
      onClose();
    } catch (err) {
      console.error('Update channel error:', err);
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
      <DialogTitle sx={{ fontWeight: 'bold' }}>Edit channel</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            sx={{ input: { color: '#fff' }, label: { color: '#aaa' } }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ textarea: { color: '#fff' }, label: { color: '#aaa' } }}
          />
          
          <Box>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>Avatar</Typography>
            <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} style={{ color: '#fff' }} />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>Banner</Typography>
            <input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files[0])} style={{ color: '#fff' }} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: '#fff' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleUpdate} 
          disabled={!channelName || loading}
          sx={{ borderRadius: '20px', bgcolor: '#fff', color: '#000' }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditChannelModal;
