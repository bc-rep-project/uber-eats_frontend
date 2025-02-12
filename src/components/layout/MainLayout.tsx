import React from 'react';
import { Box } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {children}
    </Box>
  );
};

export default MainLayout; 