import { createTheme, alpha } from '@mui/material';

const commonComponents = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        padding: '1px', // Space for gradient border
        background: `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.primary.light}40)`,
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 24,
          padding: '1px',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        },
        '& > *:first-of-type': {
          borderRadius: 23,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(241, 245, 249, 0.9))',
        },
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(99, 102, 241, 0.3)'
          : '0 4px 20px rgba(99, 102, 241, 0.15)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 40px rgba(99, 102, 241, 0.4), 0 0 20px rgba(99, 102, 241, 0.4) inset'
            : '0 20px 40px rgba(99, 102, 241, 0.25), 0 0 20px rgba(99, 102, 241, 0.1) inset',
          '&::before': {
            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          },
        },
      }),
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
