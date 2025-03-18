import React from 'react';
import { 
  IconButton, 
  Typography, 
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { Brightness4, Brightness7, AccountCircle, ExitToApp, Person } from '@mui/icons-material';
import { useMsal, useIsAuthenticated, useAccount } from '@azure/msal-react';
import { loginRequest } from '../../auth/authConfig';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import mySvg from '../../../media/postbank-logo--bg.svg';
import logoImg from '../../../media/haiper_logo.png';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error("Login failed", e);
    });
  };
  
  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
    });
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="main-layout">
      <Box 
        component="header" 
        sx={{
          backgroundColor: '#0047AB',
          padding: '20px 0px',
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
          
          {isAuthenticated ? (
            <>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
                onClick={handleMenuOpen}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    marginRight: '8px',
                    backgroundColor: '#1976d2'
                  }}
                >
                  {account?.name?.charAt(0) || <Person />}
                </Avatar>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'white',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {account?.name || account?.username || 'User'}
                </Typography>
              </Box>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: { minWidth: '200px' }
                }}
              >
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Avatar sx={{ width: 40, height: 40, margin: '0 auto', mb: 1, backgroundColor: '#1976d2' }}>
                    {account?.name?.charAt(0) || <Person />}
                  </Avatar>
                  <Typography variant="subtitle1">{account?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{account?.username}</Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 2 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              variant="contained"
              startIcon={<AccountCircle />}
              sx={{
                backgroundColor: 'white',
                color: '#0047AB',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }
              }}
            >
              Sign In
            </Button>
          )}
          
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
        width: '100%',
        maxWidth: 'none',
        padding: '5px 0',
        margin: '0 auto'
      }}>
        {children}
      </main>
    </div>
  );
};
