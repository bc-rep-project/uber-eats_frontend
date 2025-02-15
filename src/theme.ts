import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // UberEats uses black as primary color
      light: '#333333',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06C167', // UberEats green
      light: '#39D98A',
      dark: '#048848',
      contrastText: '#ffffff',
    },
    success: {
      main: '#06C167',
      light: '#39D98A',
      dark: '#048848',
    },
    error: {
      main: '#FF3346',
      light: '#FF6674',
      dark: '#CC0017',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#545454',
    },
    divider: '#E8E8E8',
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
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
    },
    subtitle1: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.95rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '32px',
          borderRadius: '16px',
        },
        outlined: {
          borderColor: '#E8E8E8',
          '&:hover': {
            backgroundColor: '#F6F6F6',
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: '56px',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: '6px 0',
          minWidth: 'auto',
          '&.Mui-selected': {
            paddingTop: '6px',
          },
        },
        label: {
          fontSize: '0.75rem',
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#F6F6F6',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#EFEFEF',
          },
        },
      },
    },
  },
});

export default theme; 