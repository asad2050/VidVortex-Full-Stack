import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, Link as MuiLink, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      await API.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          height: 'calc(100vh - 64px)', 
          overflowY: 'auto',
          py: 4
        }}>
          <Paper sx={{ p: 4, width: '100%', maxWidth: '400px', bgcolor: '#1f1f1f', color: '#fff', borderRadius: '12px' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>Create Account</Typography>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Registration successful! Redirecting...</Alert>}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
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
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
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
                disabled={loading || success}
                sx={{ mt: 3, mb: 2, bgcolor: '#ff0000', '&:hover': { bgcolor: '#cc0000' }, py: 1.2, fontWeight: 'bold' }}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
            
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#aaa', mt: 2 }}>
              Already have an account? {' '}
              <MuiLink component={Link} to="/login" sx={{ color: '#3ea6ff', textDecoration: 'none' }}>
                Sign In
              </MuiLink>
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Register;
