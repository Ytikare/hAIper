import { createTheme, alpha } from '@mui/material';

const commonComponents = {
  MuiCard: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 500,
        padding: '8px 16px',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(10px)',
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    background: {
      default: '#f8fafc',
      paper: alpha('#ffffff', 0.8),
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: commonComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8', // Lighter indigo for dark mode
      light: '#93c5fd',
      dark: '#6366f1',
    },
    background: {
      default: '#0f172a', // Dark blue-gray
      paper: alpha('#1e293b', 0.8),
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: commonComponents,
});
