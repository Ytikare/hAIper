import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { workflowService } from '../../services/workflow-service';

interface WorkflowFeedbackProps {
  feedback: 'positive' | 'negative' | null;
  onFeedbackChange: (feedback: 'positive' | 'negative') => void;
  workflowId: string;
}

export const WorkflowFeedback: React.FC<WorkflowFeedbackProps> = ({
  feedback,
  onFeedbackChange,
  workflowId,
}) => {
  const handleFeedback = async (newFeedback: 'positive' | 'negative') => {
    try {
      await workflowService.submitFeedback(workflowId, newFeedback);
      onFeedbackChange(newFeedback);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Still update UI state even if API call fails
      onFeedbackChange(newFeedback);
    }
  };
  return (
    <Box sx={{ 
      mt: 4, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 2 
    }}>
      <Typography variant="subtitle1" color="text.secondary">
        Was this result helpful?
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant={feedback === 'positive' ? 'contained' : 'outlined'}
          onClick={() => handleFeedback('positive')}
          sx={{
            minWidth: '120px',
            color: feedback === 'positive' ? 'white' : 'success.main',
            borderColor: 'success.main',
            bgcolor: feedback === 'positive' ? 'success.main' : 'transparent',
            '&:hover': {
              bgcolor: feedback === 'positive' ? 'success.dark' : 'success.light',
              borderColor: 'success.main',
            }
          }}
        >
          👍 Yes
        </Button>
        <Button
          variant={feedback === 'negative' ? 'contained' : 'outlined'}
          onClick={() => handleFeedback('negative')}
          sx={{
            minWidth: '120px',
            color: feedback === 'negative' ? 'white' : 'error.main',
            borderColor: 'error.main',
            bgcolor: feedback === 'negative' ? 'error.main' : 'transparent',
            '&:hover': {
              bgcolor: feedback === 'negative' ? 'error.dark' : 'error.light',
              borderColor: 'error.main',
            }
          }}
        >
          👎 No
        </Button>
      </Box>
      {feedback && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {feedback === 'positive' 
            ? 'Thank you for your feedback!' 
            : 'Thanks for letting us know. We\'ll work on improving this.'}
        </Typography>
      )}
    </Box>
  );
};
