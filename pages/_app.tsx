import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { WorkflowProvider } from '../src/contexts/WorkflowContext';
import { MainLayout } from '../src/components/layout/MainLayout';
import '../src/styles/theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <WorkflowProvider>
        <CssBaseline />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </WorkflowProvider>
    </ThemeProvider>
  );
}
