import { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography, Avatar, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { Home, Whatshot, Subscriptions, VideoLibrary, History, WatchLater, ThumbUp, Settings, Flag, Help, Feedback } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CATEGORIES } from '../../constants/categories';
import { useAuth } from '../../hooks/useAuth';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import API from '../../api/axios';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const { isLoggedIn } = useAuth();
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isLoggedIn) {
      const fetchSubscriptions = async () => {
        try {
          const response = await API.get('/channels/subscribed');
          setSubscribedChannels(response.data);
        } catch (err) {
          console.error('Error fetching sidebar subscriptions:', err);
        }
      };
      fetchSubscriptions();
    } else {
      setSubscribedChannels([]);
    }
  }, [isLoggedIn]);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      dispatch(setSidebarOpen(false));
    }
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Subscriptions', icon: <Subscriptions />, path: '/subscriptions' },
  ];

  const libraryItems = [
    { text: 'Liked Videos', icon: <ThumbUp />, path: '/liked-videos' },
  ];

  const SidebarContent = (
    <Box sx={{ 
      height: '100%', 
      backgroundColor: '#0f0f0f', 
      color: '#fff', 
      overflowY: 'auto',
      width: isMobile ? 240 : (isSidebarOpen ? 240 : 72),
      transition: 'width 0.3s',
    }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => item.path && handleNavigation(item.path)}>
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              {(isSidebarOpen || isMobile) && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: '#333' }} />
      {(isSidebarOpen || isMobile) && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#aaa', fontWeight: 'bold' }}>Library</Typography>
        </Box>
      )}
      <List>
        {libraryItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => item.path && handleNavigation(item.path)}>
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              {(isSidebarOpen || isMobile) && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: '#333' }} />

      {(isSidebarOpen || isMobile) && isLoggedIn && subscribedChannels.length > 0 && (
        <>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#aaa', fontWeight: 'bold' }}>Subscriptions</Typography>
          </Box>
          <List>
            {subscribedChannels.map((channel) => (
              <ListItem key={channel._id} disablePadding>
                <ListItemButton onClick={() => handleNavigation(`/channel/${channel._id}`)}>
                  <ListItemIcon>
                    <Avatar 
                      src={channel.channelAvatar} 
                      sx={{ width: 24, height: 24 }}
                    >
                      {channel.channelName[0]}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={channel.channelName} 
                    primaryTypographyProps={{ noWrap: true, fontSize: '14px' }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: '#333' }} />
        </>
      )}

      {(isSidebarOpen || isMobile) && (
        <>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#aaa', fontWeight: 'bold' }}>Categories</Typography>
          </Box>
          <List>
            {CATEGORIES.map((cat) => (
              <ListItem key={cat} disablePadding>
                <ListItemButton onClick={() => handleNavigation(`/?category=${cat}`)}>
                  <ListItemText primary={cat} sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => dispatch(setSidebarOpen(false))}
        PaperProps={{ sx: { bgcolor: '#0f0f0f', border: 'none' } }}
      >
        {SidebarContent}
      </Drawer>
    );
  }

  return (
    <Box 
      sx={{ 
        width: isSidebarOpen ? 240 : 72, 
        backgroundColor: '#0f0f0f', 
        color: '#fff', 
        height: 'calc(100vh - 64px)', 
        overflowY: 'auto',
        transition: 'width 0.3s',
      }}
    >
      {SidebarContent}
    </Box>
  );
};

export default Sidebar;
