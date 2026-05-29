import { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Menu, MenuItem, TextField, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const CommentItem = ({ comment, currentUserId, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit(comment._id, editText);
    setIsEditing(false);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(comment._id);
    setOpenDeleteDialog(false);
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff0000', fontSize: '14px' }}>
        {comment.username[0].toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#fff' }}>
              @{comment.username}
            </Typography>
            <Typography variant="caption" sx={{ color: '#aaa' }}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          {currentUserId === comment.userId && (
            <IconButton size="small" sx={{ color: '#fff' }} onClick={handleMenuOpen}>
              <MoreVert fontSize="small" />
            </IconButton>
          )}
        </Box>

        {isEditing ? (
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              variant="standard"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              sx={{ input: { color: '#fff' } }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
              <Button size="small" sx={{ color: '#fff' }} onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button size="small" variant="contained" onClick={handleEdit} sx={{ borderRadius: '20px', bgcolor: '#3ea6ff', color: '#000' }}>Save</Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: '#fff', mt: 0.5 }}>
            {comment.text}
          </Typography>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: { bgcolor: '#1f1f1f', color: '#fff' } }}
        >
          <MenuItem onClick={() => { setIsEditing(true); handleMenuClose(); }}>Edit</MenuItem>
          <MenuItem onClick={() => { setOpenDeleteDialog(true); handleMenuClose(); }}>Delete</MenuItem>
        </Menu>

        <Dialog 
          open={openDeleteDialog} 
          onClose={() => setOpenDeleteDialog(false)}
          PaperProps={{ sx: { bgcolor: '#1f1f1f', color: '#fff' } }}
        >
          <DialogTitle>Delete Comment?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} sx={{ color: '#fff' }}>Cancel</Button>
            <Button onClick={handleDelete} sx={{ color: '#ff0000' }}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CommentItem;
