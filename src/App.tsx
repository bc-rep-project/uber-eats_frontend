import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#00a082',
      light: '#33b39e',
      dark: '#007057',
      contrastText: '#fff',
    },
    secondary: {
      main: '#276ef1',
      light: '#528af3',
      dark: '#1b4da8',
      contrastText: '#fff',
    },
    success: {
      main: '#00a082',
      light: '#33b39e',
      dark: '#007057',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/grocery" element={<div>Grocery Page</div>} />
          <Route path="/browse" element={<div>Browse Page</div>} />
          <Route path="/carts" element={<div>Carts Page</div>} />
          <Route path="/account" element={<div>Account Page</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 