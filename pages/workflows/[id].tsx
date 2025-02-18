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
import { workflowService } from '../../src/services/workflow-service'

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
        const workflow = await workflowService.getWorkflow(workflowId);
        
        if (!workflow) {
          console.error('Workflow not found');
          setLoading(false);
          setActiveWorkflow(null);
          return;
        }
        
        setActiveWorkflow(workflow);
        setLoading(false);
      } catch (error) {
        console.error('Error loading workflow:', error);
        setLoading(false);
        setActiveWorkflow(null);
      }
    };

    loadWorkflow();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(241, 245, 249, 0.9))',
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 4px 20px rgba(99, 102, 241, 0.3)'
              : '0 4px 20px rgba(99, 102, 241, 0.15)',
          }}
        >
          <Typography variant="h6">Loading workflow...</Typography>
        </Paper>
      </Container>
    );
  }

  if (!activeWorkflow) {
    return <div>Workflow not found</div>;
  }

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: 4,
        position: 'relative',
      }}
    >
      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          borderRadius: 3,
          position: 'relative',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(241, 245, 249, 0.9))',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(99, 102, 241, 0.3)'
            : '0 4px 20px rgba(99, 102, 241, 0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            padding: '2px',
            background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(99, 102, 241, 0.2)',
          }}
        >
          {activeWorkflow.name}
        </Typography>
        <Typography 
          color="text.secondary" 
          paragraph
          sx={{
            maxWidth: '800px',
            lineHeight: 1.6,
            mb: 4
          }}
        >
          {activeWorkflow.description}
        </Typography>
        <WorkflowExecutor workflow={activeWorkflow} />
      </Paper>
    </Container>
  );
}
