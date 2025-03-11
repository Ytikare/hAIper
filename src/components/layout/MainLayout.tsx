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
import logoImg from '../../../media/haiper_logo.png';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="main-layout">
      <Box 
        component="header" 
        sx={{
          backgroundColor: '#0047AB',
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          height: '108px',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <Image 
              src={mySvg}
              alt="PostBank Logo"
              width={250}
              height={108}
              style={{ marginRight: '20px' }}
            />
          </Link>
          <Image 
            src={logoImg}
            alt="Haiper Logo"
            style={{ 
              width: 'auto',
              height: '60px',   // Maintain the height you want
              marginLeft: '20px' 
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingRight: 3 }}>
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
      </Box>
      <main className="main-content" style={{
        maxWidth: 'none',
        padding: '20px 0',
        margin: '0'
      }}>
        {children}
      </main>
    </div>
  );
};
