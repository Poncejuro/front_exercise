import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../../services'; 
import { useDispatch } from 'react-redux'; 
import { loginSuccess, loginFailure } from '../../redux/store';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    if (username === '' || password === '') {
      setError('Please enter both username and password.');
    } else {
      try {
        setIsLoading(true);  
        const result = await LoginService(username, password);

        if (result.token) {
          setIsLoading(false);
          dispatch(loginSuccess({ username, token: result.token }));  
          navigate('/home');  
        } else {
          setIsLoading(false);
          setError('Incorrect credentials.');
        }
      } catch (error) {
        setIsLoading(false);
        setError('Incorrect credentials.');
        dispatch(loginFailure(error.message)); 
      }
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');  
      }, 5000);

      return () => clearTimeout(timer);  
    }
  }, [error]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          LogIn
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading} 
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
