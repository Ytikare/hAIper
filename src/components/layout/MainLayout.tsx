import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box,
  Button,
  useTheme as useMuiTheme
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = useMuiTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(15, 23, 42, 0.8)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography 
              variant="h5" 
              component="div"
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #d946ef)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&::before': {
                  content: '""',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 0 15px #6366f1',
                  animation: 'pulse 2s infinite',
                },
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)',
                  },
                  '70%': {
                    boxShadow: '0 0 0 10px rgba(99, 102, 241, 0)',
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)',
                  },
                },
              }}
            >
              hAIper
              <span style={{ 
                fontSize: '0.7em', 
                background: 'rgba(99, 102, 241, 0.1)',
                padding: '4px 8px',
                borderRadius: '12px',
                marginLeft: '4px',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                AI Platform
              </span>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={Link}
            href="/admin"
            sx={{
              mr: 2,
              bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            Admin
          </Button>
          <IconButton 
            onClick={toggleTheme} 
            sx={{
              bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};
