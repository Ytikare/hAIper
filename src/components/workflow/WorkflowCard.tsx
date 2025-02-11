import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { Workflow } from '../../types/workflow';
import { workflowService } from '../../services/workflow-service';

interface WorkflowCardProps {
  workflow: Workflow;
}


const WorkflowCard: FC<WorkflowCardProps> = ({ workflow }) => {
  const router = useRouter();

  const handleStart = async () => {
    try {
      // Fetch the workflow data before navigation
      await workflowService.getWorkflow(workflow.id);
      // If successful, navigate to the workflow page
      router.push(`/workflows/${workflow.id}`);
    } catch (error) {
      // You might want to add error handling here, such as showing a snackbar or alert
      console.error('Failed to fetch workflow:', error);
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h2">
            {workflow.name}
          </Typography>
        </Box>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {workflow.description}
        </Typography>
        <Chip 
          label={workflow.status} 
          color={workflow.status === 'available' ? 'success' : 'warning'}
          size="small"
        />
      </CardContent>
      <CardActions>
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleStart}
          disabled={workflow.status !== 'available'}
        >
          {workflow.status === 'available' ? 'Start Workflow' : 'Coming Soon'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default WorkflowCard;
