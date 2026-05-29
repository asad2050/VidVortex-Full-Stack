import { Card, CardMedia, CardContent, Typography, Box, Avatar } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <Card sx={{ 
      backgroundColor: 'transparent', 
      backgroundImage: 'none', 
      boxShadow: 'none', 
      borderRadius: '12px',
      cursor: 'pointer',
      '&:hover': {
        '& .MuiCardMedia-root': {
          borderRadius: '0px'
        }
      }
    }}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={video.thumbnailUrl}
          alt={video.title}
          sx={{ 
            aspectRatio: '16/9', 
            borderRadius: '12px',
            transition: 'border-radius 0.2s'
          }}
        />
      </Link>
      <CardContent sx={{ px: 0, pt: 1.5, display: 'flex', gap: 1.5 }}>
        <Link to={`/channel/${video.channelId?._id || video.channelId}`}>
          <Avatar 
            src={video.channelId?.channelAvatar} 
            sx={{ width: 36, height: 36 }}
          >
            {video.channelName?.[0]}
          </Avatar>
        </Link>
        <Box>
          <Link to={`/video/${video._id}`} style={{ textDecoration: 'none', color: '#fff' }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold', 
                lineHeight: 1.2,
                maxHeight: '2.4em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                mb: 0.5
              }}
            >
              {video.title}
            </Typography>
          </Link>
          <Link 
            to={`/channel/${video.channelId?._id || video.channelId}`} 
            style={{ textDecoration: 'none', color: '#aaa' }}
          >
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              {video.channelId?.channelName || video.channelName}
              <CheckCircle sx={{ fontSize: '14px', ml: 0.5 }} />
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            {video.views?.toLocaleString()} views • {new Date(video.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
