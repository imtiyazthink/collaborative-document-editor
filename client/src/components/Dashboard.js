import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import { Container, Typography } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNewDocument = () => {
    navigate('/editor');
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <button onClick={handleNewDocument}>Edit Document</button>
      </Container>
    </div>
  );
};

export default Dashboard;
