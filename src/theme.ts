import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Update to black for UberEats' current branding
      light: '#333333',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#06C167', // UberEats green for CTAs
      light: '#34D186',
      dark: '#05944F',
      contrastText: '#fff',
    },
    error: {
      main: '#FF3346', // UberEats red
      light: '#FF6674',
      dark: '#CC0013',
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
    grey: {
      100: '#EAEBEB',
      200: '#D4D5D5',
      300: '#BDBEBE',
      400: '#A7A8A8',
      500: '#909191',
    },
  },
  typography: {
    fontFamily: '"UberMove", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.5px',
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
      color: '#545454',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
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
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
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