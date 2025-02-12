import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00A082', // UberEats green
      light: '#33B39E',
      dark: '#007057',
      contrastText: '#fff',
    },
    secondary: {
      main: '#276EF1', // Blue
      light: '#527AF3',
      dark: '#1B4DA8',
      contrastText: '#fff',
    },
    error: {
      main: '#E11900', // Red
      light: '#E74C3C',
      dark: '#B71C1C',
    },
    warning: {
      main: '#FFC043', // Yellow
      light: '#FFD369',
      dark: '#F5A623',
    },
    success: {
      main: '#05944F', // Green
      light: '#37A96E',
      dark: '#036B38',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F6F6F6',
    },
  },
  typography: {
    fontFamily: '"UberMove", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#007057',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 