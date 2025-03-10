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
import mySvg from '../../../media/postbank-logo--bg.svg';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="main-layout">
      <header className="app-header">
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <Image 
            src={mySvg}
            alt="PostBank Logo"
            width={240}
            height={104}
            style={{ marginRight: '10px' }}
          />
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
