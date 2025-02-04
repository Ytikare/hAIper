import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import { WorkflowTemplate } from '../../types/workflow-builder';
import { WorkflowProgress } from '../../types/workflow';

interface WorkflowExecutorProps {
  workflow: WorkflowTemplate;
}

export const WorkflowExecutor: React.FC<WorkflowExecutorProps> = ({ workflow }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState<WorkflowProgress>({
    currentStep: 0,
    totalSteps: workflow.fields.length,
    status: 'pending',
    stepDetails: ''
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {workflow.fields.map((field, index) => (
          <Step key={index}>
            <StepLabel>{field.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 4, mb: 2 }}>
        {activeStep === workflow.fields.length ? (
          <Typography>Workflow completed</Typography>
        ) : (
          <>
            <Typography>Step {activeStep + 1}: {workflow.fields[activeStep]?.label}</Typography>
            {/* Form fields will be added here */}
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
        <Button
          variant="contained"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === workflow.fields.length}
        >
          {activeStep === workflow.fields.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};
