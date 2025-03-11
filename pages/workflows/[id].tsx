import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Container, 
  Typography, 
  Box
} from '@mui/material';
import { WorkflowExecutor } from '../../src/components/workflow/WorkflowExecutor';
import { workflowService } from '../../src/services/workflow-service'
import { WorkflowTemplate } from '../../src/types/workflow-builder';

export default function WorkflowPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowTemplate | null>(null);
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
      <Container 
        maxWidth={false} 
        sx={{ 
          py: 4, 
          width: '100%', 
          margin: '0 auto' 
        }}
      >
        <Box 
          sx={{ 
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Loading workflow...</Typography>
        </Box>
      </Container>
    );
  }

  if (!activeWorkflow) {
    return (
      <Container 
        maxWidth={false} 
        sx={{ 
          py: 4, 
          width: '100%', 
          margin: '0 auto' 
        }}
      >
        <Typography variant="h6">Workflow not found</Typography>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        py: 4,
        width: '100%', 
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          {activeWorkflow.name}
        </Typography>
        <Typography 
          color="text.secondary" 
          paragraph
          sx={{
            lineHeight: 1.6,
            mb: 4
          }}
        >
          {activeWorkflow.description}
        </Typography>
        <WorkflowExecutor workflow={activeWorkflow} />
      </Box>
    </Container>
  );
}