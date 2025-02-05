import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { WorkflowTemplate } from '../../types/workflow-builder';
import { workflowService } from '../../services/workflow-service';
import { WorkflowField } from './WorkflowField';

interface WorkflowExecutorProps {
  workflow: WorkflowTemplate;
}

export const WorkflowExecutor: React.FC<WorkflowExecutorProps> = ({ workflow }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < workflow.fields.length - 1) {
      handleNext();
      return;
    }
    try {
      const response = await workflowService.executeWorkflow(workflow.id, formData);
      setResult(response.result);
      setError('');
      handleNext();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const currentField = workflow.fields[activeStep];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {workflow.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {workflow.description}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {workflow.fields.map((field, index) => (
          <Step key={index}>
            <StepLabel>{field.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === workflow.fields.length ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Workflow completed!
          </Typography>
          {result && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Result:
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </Box>
          )}
          <Button
            variant="contained"
            onClick={() => {
              setActiveStep(0);
              setFormData({});
              setResult(null);
            }}
            sx={{ mt: 2 }}
          >
            Start New Workflow
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <WorkflowField
              field={currentField}
              value={formData[currentField.name || currentField.label]}
              onChange={(value) => handleFieldChange(currentField.name || currentField.label, value)}
            />

            {error && (
              <Typography color="error">
                {error}
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {activeStep === workflow.fields.length - 1 ? 'Execute' : 'Next'}
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Paper>
  );
};
