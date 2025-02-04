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
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              hAIper Platform
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, ml: 4 }}>
            <Link href="/workflows" passHref>
              <Button color="inherit">Workflows</Button>
            </Link>
            <Link href="/workflows/cv-analysis" passHref>
              <Button color="inherit">CV Analysis</Button>
            </Link>
            <Link href="/workflows/it-helper" passHref>
              <Button color="inherit">IT Helper</Button>
            </Link>
          </Box>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
