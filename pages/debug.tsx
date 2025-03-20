import type { NextPage } from 'next';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Import the debugger component dynamically to avoid server-side rendering issues
const ApiDebugger = dynamic(
  () => import('../src/components/debug/ApiDebugger'),
  { ssr: false }
);

const DebugPage: NextPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          System Diagnostics
        </Typography>
        <Typography color="text.secondary" paragraph>
          This page provides tools to diagnose connection issues between the frontend and backend.
        </Typography>
        
        <Button 
          component={Link} 
          href="/"
          variant="outlined"
          sx={{ mb: 3 }}
        >
          Return to Home
        </Button>
      </Paper>
      
      <ApiDebugger />
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Configuration Information</Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'background.paper', 
          p: 2, 
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'auto'
        }}>
          {`Environment: ${process.env.NODE_ENV}
Next.js Version: ${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'Unknown'}
Build Time: ${new Date().toISOString()}
`}
        </Box>
      </Paper>
    </Container>
  );
};

export default DebugPage;