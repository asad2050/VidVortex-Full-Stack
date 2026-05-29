import { Box, Chip } from '@mui/material';
import { CATEGORIES } from '../../constants/categories';

const FilterButtons = ({ activeCategory, onCategoryChange }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 1, 
        overflowX: 'auto', 
        py: 2, 
        px: 1,
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        position: 'sticky',
        top: 0,
        backgroundColor: '#0f0f0f',
        zIndex: 10
      }}
    >
      {CATEGORIES.map((cat) => (
        <Chip
          key={cat}
          label={cat}
          onClick={() => onCategoryChange(cat)}
          sx={{
            backgroundColor: activeCategory === cat ? '#fff' : '#272727',
            color: activeCategory === cat ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: activeCategory === cat ? '#fff' : '#3f3f3f',
            },
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        />
      ))}
    </Box>
  );
};

export default FilterButtons;
