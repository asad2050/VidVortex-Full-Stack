import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, MenuItem, LinearProgress, Typography } from '@mui/material';
import { CATEGORIES } from '../../constants/categories';
import API from '../../api/axios';

const VideoUploadForm = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'All',
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !formData.title) return;

    try {
      setLoading(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      if (thumbnail) data.append('thumbnailUrl', thumbnail);
      data.append('videoUrl', videoFile);

      const response = await API.post('/videos', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      onSuccess(response.data);
      onClose();
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={loading ? null : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { bgcolor: '#1f1f1f', color: '#fff' } }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>Upload Video</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Title (required)"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ input: { color: '#fff' }, label: { color: '#aaa' } }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            sx={{ textarea: { color: '#fff' }, label: { color: '#aaa' } }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
            sx={{ color: '#fff', '& .MuiSelect-select': { color: '#fff' }, label: { color: '#aaa' } }}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>Thumbnail</Typography>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setThumbnail(e.target.files[0])} 
              style={{ color: '#fff' }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>Video File (required)</Typography>
            <input 
              type="file" 
              accept="video/*" 
              required
              onChange={(e) => setVideoFile(e.target.files[0])} 
              style={{ color: '#fff' }}
            />
          </Box>

          {loading && (
            <Box sx={{ mt: 3 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                Uploading: {uploadProgress}%
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading} sx={{ color: '#fff' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          disabled={!formData.title || !videoFile || loading}
          sx={{ borderRadius: '20px', bgcolor: '#3ea6ff', color: '#000' }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoUploadForm;
