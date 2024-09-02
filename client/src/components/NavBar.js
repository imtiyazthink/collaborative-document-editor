import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Badge } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <DocumentScannerIcon style={{ width: 40, height: 40 }} />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Collaborative Document
        </Typography>

        <div>
          <Badge
            color="secondary"
            sx={{ mr: 2 }}
          >
            <Typography variant="body1">
              {user ? user.name : 'Guest'}
            </Typography>
          </Badge>
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
