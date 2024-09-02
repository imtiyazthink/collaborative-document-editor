import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Container, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { loginFailure, loginSuccess } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, { email, password });
      dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
      navigate('/dashboard')
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
