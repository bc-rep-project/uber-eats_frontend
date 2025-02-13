import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
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
            Create your UberEats account
          </Typography>
          <RegisterForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 