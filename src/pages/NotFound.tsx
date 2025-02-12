import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h1">404 - Page Not Found</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound; 