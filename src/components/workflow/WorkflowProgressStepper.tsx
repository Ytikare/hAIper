import React from 'react';
import { Stepper, Step, StepLabel, Box, CircularProgress, Typography } from '@mui/material';
import { WorkflowProgress } from '../../types/workflow';

interface WorkflowProgressStepperProps {
  progress: WorkflowProgress;
}

export const WorkflowProgressStepper: React.FC<WorkflowProgressStepperProps> = ({ progress }) => {
  const steps = [
    'Preparing Workflow',
    'Sending to Backend',
    'Executing in Airflow',
    'Processing Results'
  ];

  const getStepIcon = (stepIndex: number) => {
    const currentStep = progress.currentStep;
    
    if (progress.status === 'failed') {
      return <Typography color="error">×</Typography>;
    }
    
    if (stepIndex === currentStep && progress.status === 'in_progress') {
      return <CircularProgress size={24} />;
    }
    
    return null;
  };

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
      <Stepper activeStep={progress.currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                icon: getStepIcon(index)
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {progress.stepDetails && (
        <Typography
          align="center"
          sx={{ mt: 2 }}
          color={progress.status === 'failed' ? 'error' : 'text.secondary'}
        >
          {progress.stepDetails}
        </Typography>
      )}
    </Box>
  );
};
