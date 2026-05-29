import { Box, Typography, Avatar, Button, Stack, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const ChannelInfo = ({ channel, isOwner, onUploadClick, onEditClick, onDeleteClick, onSubscribe }) => {
  const { user, isLoggedIn } = useAuth();
  const isSubscribed = Array.isArray(channel.subscribers) && channel.subscribers.includes(user?._id);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box sx={{ color: '#fff' }}>
      <Box 
        sx={{ 
          height: '200px', 
          width: '100%', 
          backgroundImage: channel.channelBanner ? `url(${channel.channelBanner})` : 'linear-gradient(90deg, #333 0%, #111 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
      />
      <Box sx={{ px: { xs: 2, md: 10 }, py: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
          <Avatar 
            src={channel.channelAvatar} 
            sx={{ width: 128, height: 128, border: '4px solid #0f0f0f' }}
          >
            {channel.channelName[0]}
          </Avatar>
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{channel.channelName}</Typography>
            <Typography variant="body1" sx={{ color: '#aaa' }}>{channel.handle} • {channel.subscribers?.length || 0} subscribers</Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mt: 1, maxWidth: '600px' }}>
              {channel.description || 'No description provided.'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isOwner ? (
              <>
                <Button 
                  variant="contained" 
                  onClick={onUploadClick}
                  sx={{ borderRadius: '20px', bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#eee' }, textTransform: 'none', fontWeight: 'bold' }}
                >
                  Upload Video
                </Button>
                <IconButton onClick={handleMenuOpen} sx={{ color: '#fff' }}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{ sx: { bgcolor: '#1f1f1f', color: '#fff' } }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); onEditClick(); }}>
                    <Edit sx={{ mr: 1, fontSize: '20px' }} /> Edit Channel
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); onDeleteClick(); }} sx={{ color: '#ff4d4d' }}>
                    <Delete sx={{ mr: 1, fontSize: '20px' }} /> Delete Channel
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                variant="contained" 
                onClick={onSubscribe}
                disabled={!isLoggedIn}
                sx={{ 
                  borderRadius: '20px', 
                  bgcolor: isSubscribed ? '#333' : '#fff', 
                  color: isSubscribed ? '#fff' : '#000', 
                  '&:hover': { bgcolor: isSubscribed ? '#444' : '#eee' },
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChannelInfo;
