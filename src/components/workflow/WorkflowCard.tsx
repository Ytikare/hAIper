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

interface WorkflowCardProps {
  workflow: Workflow;
}


const WorkflowCard: FC<WorkflowCardProps> = ({ workflow }) => {
  const router = useRouter();

  const handleStart = () => {
    router.push(`/workflows/${workflow.id}`);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img 
            src={workflow.icon} 
            alt={workflow.name} 
            style={{ width: 40, height: 40, marginRight: 12 }} 
          />
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