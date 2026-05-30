import { Box, Stack } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import GuestPrompt from '../components/common/GuestPrompt';
import { useAuth } from '../hooks/useAuth';

const History = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box sx={{ flex: 1, p: 2 }}>
          {!isLoggedIn ? (
            <GuestPrompt 
              icon={<HistoryIcon sx={{ fontSize: 100 }} />}
              title="Keep track of what you watch"
              message="Watch history isn't viewable when you're signed out."
            />
          ) : (
            <Box sx={{ color: '#fff' }}>Your watch history will appear here.</Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default History;
