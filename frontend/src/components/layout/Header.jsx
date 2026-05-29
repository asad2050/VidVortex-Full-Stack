import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, VideoCall, AccountCircle } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import { toggleSidebar } from '../../store/slices/uiSlice';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  const handleMyChannel = () => {
    handleMenuClose();
    if (user?.channelId) {
      navigate(`/channel/${user.channelId}`);
    } else {
      navigate(`/channel/new`); // This will be handled in ChannelPage
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#0f0f0f', backgroundImage: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggleSidebar())}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <span style={{ color: '#ff0000', marginRight: '4px', fontSize: '24px' }}>●</span>
            VidVortex
          </Typography>
        </Box>

        <Box 
          component="form" 
          onSubmit={handleSearch}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#1f1f1f', 
            borderRadius: '20px', 
            px: 2, 
            width: { xs: '100%', sm: '40%' },
            border: '1px solid #333'
          }}
        >
          <InputBase
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ color: '#fff', flex: 1 }}
          />
          <IconButton type="submit" sx={{ color: '#aaa' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isLoggedIn ? (
            <>
              <IconButton color="inherit" onClick={handleMyChannel}>
                <VideoCall />
              </IconButton>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 1 }}>
                {user.avatar ? (
                  <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
                ) : (
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff0000' }}>
                    {user.username[0].toUpperCase()}
                  </Avatar>
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{ sx: { bgcolor: '#1f1f1f', color: '#fff' } }}
              >
                <MenuItem onClick={handleMyChannel}>My Channel</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<AccountCircle />}
              onClick={() => navigate('/login')}
              sx={{ borderRadius: '20px', textTransform: 'none' }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
