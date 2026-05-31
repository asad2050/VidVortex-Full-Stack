import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import VideoGrid from '../components/video/VideoGrid';
import FilterButtons from '../components/video/FilterButtons';
import API from '../api/axios';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search') || '';
  const activeCategory = queryParams.get('category') || 'All';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        let url = '/videos';
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (activeCategory && activeCategory !== 'All') params.append('category', activeCategory);
        
        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;
        
        const response = await API.get(url);
        setVideos(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchTerm, activeCategory]);

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(location.search);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    navigate({ search: params.toString() });
  };

  return (
    <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
          <FilterButtons 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          <VideoGrid videos={videos} loading={loading} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
