import React from 'react';
import { 
  IconButton, 
  Typography, 
  Button
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="main-layout">
      <header className="app-header">
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography component="div" className="app-title">
            hAIper
            <span className="app-badge">AI Platform</span>
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Button
          component={Link}
          href="/admin"
          className="btn btn-outline"
        >
          Admin
        </Button>
        <IconButton 
          onClick={toggleTheme}
          className="btn btn-icon"
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
