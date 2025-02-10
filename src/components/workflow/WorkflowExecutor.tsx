import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { WorkflowProgress } from '../../types/workflow';
import { WorkflowProgressStepper } from './WorkflowProgressStepper';
import { WorkflowTemplate } from '../../types/workflow-builder';
import { WorkflowField } from './WorkflowField';

interface WorkflowExecutorProps {
  workflow: WorkflowTemplate;
}

export const WorkflowExecutor: React.FC<WorkflowExecutorProps> = ({ workflow }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState<WorkflowProgress>({
    currentStep: 0,
    totalSteps: 4,
    status: 'pending',
    stepDetails: ''
  });

  const updateProgress = useCallback((step: number, status: WorkflowProgress['status'], details: string) => {
    setProgress({
      currentStep: step,
      totalSteps: 4,
      status,
      stepDetails: details
    });
  }, []);

  const executeWorkflowAPI = async (data: Record<string, any>) => {
    const { apiConfig } = workflow;
    
    if (!workflow.apiConfig?.endpoint) {
      throw new Error('Workflow API endpoint not configured');
    }

    // Transform request data if transformer is provided
    const transformedData = apiConfig.transformRequest 
      ? apiConfig.transformRequest(data)
      : data;

    const response = await fetch(apiConfig.endpoint, {
      method: apiConfig.method,
      headers: {
        'Content-Type': 'application/json',
        ...apiConfig.headers,
      },
      body: apiConfig.method !== 'GET' ? JSON.stringify(transformedData) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const responseData = await response.json();
    
    // Transform response data if transformer is provided
    return apiConfig.transformResponse 
      ? apiConfig.transformResponse(responseData)
      : responseData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Step 1: Preparing workflow
      updateProgress(0, 'in_progress', 'Preparing workflow data...');
      
      // Step 2: Sending to API endpoint
      updateProgress(1, 'in_progress', 'Sending data to API endpoint...');
      const response = await executeWorkflowAPI(formData);
      
      // Step 3: Processing
      updateProgress(2, 'in_progress', 'Processing response...');
      
      // Step 4: Completing
      updateProgress(3, 'in_progress', 'Finalizing...');
      setResult(response);
      
      // Complete
      updateProgress(4, 'completed', 'Workflow completed successfully');
      setError('');
      setIsCompleted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setResult(null);
      updateProgress(progress.currentStep, 'failed', `Error: ${errorMessage}`);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleReset = () => {
    setFormData({});
    setResult(null);
    setError('');
    setIsCompleted(false);
    setProgress({
      currentStep: 0,
      totalSteps: 4,
      status: 'pending',
      stepDetails: ''
    });
  };

  if (isCompleted) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {workflow.name}
        </Typography>
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
            onClick={handleReset}
            sx={{ mt: 2 }}
          >
            Start New Workflow
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {workflow.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {workflow.description}
      </Typography>

      <form onSubmit={handleSubmit}>
        <WorkflowProgressStepper progress={progress} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {workflow.fields.map((field, index) => (
            <WorkflowField
              key={index}
              field={field}
              value={formData[field.name || field.label]}
              onChange={(value) => handleFieldChange(field.name || field.label, value)}
            />
          ))}

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Execute Workflow
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};
