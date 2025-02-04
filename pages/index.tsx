import type { NextPage } from 'next';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to hAIper Platform
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Your AI-powered workflow automation platform
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Workflows
            </Typography>
            <Typography paragraph>
              Access and manage your automated workflows
            </Typography>
            <Link href="/workflows" passHref>
              <Button variant="contained" color="primary">
                View Workflows
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              CV Analysis
            </Typography>
            <Typography paragraph>
              Analyze CVs with AI assistance
            </Typography>
            <Link href="/workflows/cv-analysis" passHref>
              <Button variant="contained" color="primary">
                Start Analysis
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              IT Helper
            </Typography>
            <Typography paragraph>
              Get IT support and solutions
            </Typography>
            <Link href="/workflows/it-helper" passHref>
              <Button variant="contained" color="primary">
                Get Help
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
