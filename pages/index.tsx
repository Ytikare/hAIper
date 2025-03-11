import type { NextPage } from 'next';
import { Box, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { WorkflowTemplate } from '../src/types/workflow-builder';
import WorkflowCard from '../src/components/workflow/WorkflowCard';
import { workflowService, WorkflowService } from '../src/services/workflow-service';

const Home: NextPage = () => {
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>([]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await workflowService.getWorkflows();
        //const data = await response.json();
        setWorkflows(response);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };

    fetchWorkflows();
  }, []);

  return (
    <Box sx={{ 
      mt: 4,
      width: '95%',
      margin: '0 auto'
    }}>
      <Typography variant="h4" gutterBottom>
        Welcome to hAIper Platform
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Your AI-powered workflow automation platform
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {workflows.map((workflow) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={workflow.id}>
            <WorkflowCard workflow={workflow} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
