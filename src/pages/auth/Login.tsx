import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign in to UberEats
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 