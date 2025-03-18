import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { WorkflowProvider } from '../src/contexts/WorkflowContext';
import { MainLayout } from '../src/components/layout/MainLayout';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../src/auth/authConfig';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider>
        <WorkflowProvider>
          <CssBaseline />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </WorkflowProvider>
      </ThemeProvider>
    </MsalProvider>
  );
}
