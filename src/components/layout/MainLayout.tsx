import React from 'react';
import { 
  IconButton, 
  Typography, 
  Button
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="main-layout">
      <header className="app-header">
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/images/postbank-logo--bg.svg"
            alt="PostBank Logo"
            width={120}
            height={52}
            style={{ marginRight: '10px' }}
          />
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
