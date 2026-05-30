import { Card, CardMedia, CardContent, Typography, Box, IconButton, Stack } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ChannelVideoCard = ({ video, isOwner, onEdit, onDelete }) => {
  return (
    <Card sx={{ 
      display: 'flex', 
      backgroundColor: 'transparent', 
      backgroundImage: 'none', 
      boxShadow: 'none', 
      mb: 2,
      gap: 2
    }}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={video.thumbnailUrl}
          alt={video.title}
          sx={{ width: 160, height: 90, borderRadius: '8px' }}
        />
      </Link>
      <CardContent sx={{ p: 0, flex: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Link to={`/video/${video._id}`} style={{ textDecoration: 'none', color: '#fff' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{video.title}</Typography>
            </Link>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              {video.views?.toLocaleString()} views • {new Date(video.createdAt).toLocaleDateString()}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#aaa', 
                mt: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {video.description}
            </Typography>
          </Box>
          {isOwner && (
            <Box>
              <IconButton onClick={() => onEdit(video)} sx={{ color: '#aaa' }}><Edit fontSize="small" /></IconButton>
              <IconButton onClick={() => onDelete(video._id)} sx={{ color: '#aaa' }}><Delete fontSize="small" /></IconButton>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ChannelVideoCard;
