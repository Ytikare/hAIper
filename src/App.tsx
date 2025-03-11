import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MuiThemeProvider theme={createTheme({
          components: {
            MuiContainer: {
              defaultProps: {
                maxWidth: false
              }
            }
          }
        })}>
          <CssBaseline />
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </MuiThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
