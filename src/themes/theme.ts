import { createTheme, alpha } from '@mui/material';

const commonComponents = {
  MuiCard: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: '1px solid rgba(99, 102, 241, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          opacity: 0.7,
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
          '&::before': {
            opacity: 1,
          }
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 600,
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
        },
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
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    background: {
      default: '#f0f4ff',
      paper: alpha('#ffffff', 0.7),
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
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
      main: '#818cf8',
      light: '#93c5fd',
      dark: '#6366f1',
    },
    background: {
      default: '#030712',
      paper: alpha('#1e293b', 0.6),
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
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
