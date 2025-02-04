import { useEffect } from 'react';
import { Grid, Typography, Container } from '@mui/material';
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
      <Typography variant="h4" component="h1" gutterBottom>
        Available Workflows
      </Typography>
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
