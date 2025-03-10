import { createTheme, alpha, Components, Theme } from '@mui/material';

const commonComponents: Components<Theme> = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 4,
        padding: '1px',
        background: theme.palette.background.paper,
        position: 'relative',
        transition: 'transform 0.3s ease',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        textTransform: 'none',
        fontWeight: 'bold',
        padding: '0.7rem 1.2rem',
        '&.MuiButton-contained': {
          backgroundColor: '#E60000',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#CC0000',
          },
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#0F318C',
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F318C',
      light: '#2850B8',
      dark: '#0A2066',
    },
    secondary: {
      main: '#E60000',
      light: '#FF1A1A',
      dark: '#CC0000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    ...commonComponents,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0F318C',
      light: '#2850B8',
      dark: '#0A2066',
    },
    secondary: {
      main: '#E60000',
      light: '#FF1A1A',
      dark: '#CC0000',
    },
    background: {
      default: '#1A1A1A',
      paper: '#262626',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E5E5E5',
    },
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: commonComponents,
});
