import React from 'react';
import { 
  IconButton, 
  Typography, 
  Button,
  Box
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
      <Box 
        component="header" 
        sx={{
          backgroundColor: '#0047AB',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          height: '80px',
          width: '100%'
        }}
      >
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <Image 
            src={mySvg}
            alt="PostBank Logo"
            width={180}
            height={78}
            style={{ marginRight: '10px' }}
          />
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Button
          component={Link}
          href="/admin"
          className="btn btn-outline"
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },
            marginRight: '10px'
          }}
        >
          Admin
        </Button>
        <IconButton 
          onClick={toggleTheme}
          className="btn btn-icon"
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
