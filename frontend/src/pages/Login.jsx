import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, Link as MuiLink, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import API from '../api/axios';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      return setError('Please fill in all fields');
    }

    try {
      setLoading(true);
      const response = await API.post('/auth/login', formData);
      dispatch(loginSuccess(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 'calc(100vh - 64px)', // Header height is 64px
          overflowY: 'auto'
        }}>
          <Paper sx={{ p: 4, width: '100%', maxWidth: '400px', bgcolor: '#1f1f1f', color: '#fff', borderRadius: '12px' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>Sign In</Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ 
                  input: { color: '#fff' }, 
                  label: { color: '#aaa' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#333' },
                    '&:hover fieldset': { borderColor: '#555' },
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ 
                  input: { color: '#fff' }, 
                  label: { color: '#aaa' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#333' },
                    '&:hover fieldset': { borderColor: '#555' },
                  }
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, bgcolor: '#ff0000', '&:hover': { bgcolor: '#cc0000' }, py: 1.2, fontWeight: 'bold' }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#aaa', mt: 2 }}>
              New to VidVortex? {' '}
              <MuiLink component={Link} to="/register" sx={{ color: '#3ea6ff', textDecoration: 'none' }}>
                Create an account
              </MuiLink>
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
