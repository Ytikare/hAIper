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
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography 
              variant="h6" 
              component="div"
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              hAIper
              <Box 
                component="span" 
                sx={{ 
                  ml: 1,
                  fontSize: '0.7em',
                  py: 0.5,
                  px: 1,
                  borderRadius: '6px',
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                AI Platform
              </Box>
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
