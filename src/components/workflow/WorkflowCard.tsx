import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  useTheme
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
      // Use window.location for a full page refresh
      window.location.href = `/workflows/${workflow.id}`;
    } catch (error) {
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
