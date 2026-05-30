import { Box, Typography, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GuestPrompt = ({ icon, title, message }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '70vh',
      textAlign: 'center',
      color: '#fff',
      px: 2
    }}>
      <Box sx={{ fontSize: '100px', color: '#aaa', mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: '#aaa', maxWidth: '400px' }}>
        {message}
      </Typography>
      <Button 
        variant="outlined" 
        color="primary" 
        startIcon={<AccountCircle />}
        onClick={() => navigate('/login')}
        sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default GuestPrompt;
