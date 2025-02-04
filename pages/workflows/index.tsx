import { useEffect } from 'react';
import { Grid, Typography, Container, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useWorkflow } from '../../src/contexts/WorkflowContext';
import { WorkflowCard } from '../../src/components/workflow/WorkflowCard';

export default function WorkflowsPage() {
  const { workflows } = useWorkflow();

  useEffect(() => {
    // No need to fetch workflows here since WorkflowContext 
    // already handles the initial fetch in its useEffect
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Available Workflows
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/admin/workflows')}
        >
          Manage Workflows
        </Button>
      </Box>
      <Grid container spacing={3}>
        {workflows.map((workflow) => (
          <Grid item xs={12} sm={6} md={4} key={workflow.id}>
            <WorkflowCard workflow={workflow} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
