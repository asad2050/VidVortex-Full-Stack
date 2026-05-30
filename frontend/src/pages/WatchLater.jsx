import { Box, Stack } from '@mui/material';
import { WatchLater as WatchLaterIcon } from '@mui/icons-material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import GuestPrompt from '../components/common/GuestPrompt';
import { useAuth } from '../hooks/useAuth';

const WatchLater = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box sx={{ flex: 1, p: 2 }}>
          {!isLoggedIn ? (
            <GuestPrompt 
              icon={<WatchLaterIcon sx={{ fontSize: 100 }} />}
              title="Save videos for later"
              message="Sign in to save videos to your Watch Later list"
            />
          ) : (
            <Box sx={{ color: '#fff' }}>Your watch later videos will appear here.</Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default WatchLater;
