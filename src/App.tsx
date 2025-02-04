import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
