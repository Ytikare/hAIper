import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface WorkflowFeedbackProps {
  feedback: 'positive' | 'negative' | null;
  onFeedbackChange: (feedback: 'positive' | 'negative') => void;
}

export const WorkflowFeedback: React.FC<WorkflowFeedbackProps> = ({
  feedback,
  onFeedbackChange,
}) => {
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
          onClick={() => onFeedbackChange('positive')}
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
          onClick={() => onFeedbackChange('negative')}
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
