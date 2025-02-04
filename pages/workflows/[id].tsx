import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Container, 
  Paper, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel,
  Box
} from '@mui/material';
import { useWorkflow } from '../../src/contexts/WorkflowContext';
import { WorkflowExecutor } from '../../src/components/workflow/WorkflowExecutor';

export default function WorkflowPage() {
  const router = useRouter();
  const { id } = router.query;
  const { activeWorkflow, setActiveWorkflow, workflows } = useWorkflow();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkflow = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const workflowId = Array.isArray(id) ? id[0] : id;
        const workflow = workflows.find(w => w.id === workflowId);
        
        if (!workflow) {
          console.error('Workflow not found');
          router.push('/workflows');
          return;
        }
        
        setActiveWorkflow(workflow);
        } catch (error) {
          console.error('Error loading workflow:', error);
          router.push('/workflows');
        } finally {
          setLoading(false);
        }
      }
    };

    loadWorkflow();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!activeWorkflow) {
    return <div>Workflow not found</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {activeWorkflow.name}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {activeWorkflow.description}
        </Typography>
        <WorkflowExecutor workflow={activeWorkflow} />
      </Paper>
    </Container>
  );
}
