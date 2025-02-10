import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { WorkflowProgress } from '../../types/workflow';
import { WorkflowProgressStepper } from './WorkflowProgressStepper';
import { WorkflowTemplate } from '../../types/workflow-builder';
import { WorkflowField } from './WorkflowField';

type ContentTypeResponse = {
  type: string;
  data: any;
};

interface WorkflowExecutorProps {
  workflow: WorkflowTemplate;
}

export const WorkflowExecutor: React.FC<WorkflowExecutorProps> = ({ workflow }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<ContentTypeResponse | null>(null);
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

  const executeWorkflowAPI = async (data: Record<string, any>): Promise<ContentTypeResponse> => {
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

    const contentType = response.headers.get('content-type') || '';

    // Handle different content types
    if (contentType.includes('application/json')) {
      const jsonData = await response.json();
      return {
        type: 'json',
        data: apiConfig.transformResponse ? apiConfig.transformResponse(jsonData) : jsonData
      };
    } else if (contentType.includes('image/')) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return { type: 'image', data: imageUrl };
    } else if (contentType.includes('application/pdf')) {
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      return { type: 'pdf', data: pdfUrl };
    } else if (contentType.includes('text/')) {
      const text = await response.text();
      return { type: 'text', data: text };
    } else {
      // Default to blob download for unknown types
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      return { type: 'blob', data: fileUrl };
    }
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
    if (result?.type === 'blob' || result?.type === 'image' || result?.type === 'pdf') {
      URL.revokeObjectURL(result.data);
    }
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

  const ResultDisplay: React.FC<{ result: ContentTypeResponse }> = ({ result }) => {
    switch (result.type) {
      case 'json':
        return (
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(result.data, null, 2)}
          </pre>
        );
      
      case 'image':
        return (
          <Box sx={{ mt: 2 }}>
            <img 
              src={result.data} 
              alt="Result" 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          </Box>
        );
      
      case 'pdf':
        return (
          <Box sx={{ mt: 2 }}>
            <iframe
              src={result.data}
              style={{ width: '100%', height: '500px', border: 'none' }}
              title="PDF Result"
            />
          </Box>
        );
      
      case 'text':
        return (
          <Box sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
            <Typography>{result.data}</Typography>
          </Box>
        );
      
      case 'blob':
        return (
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              href={result.data} 
              download
            >
              Download File
            </Button>
          </Box>
        );
      
      default:
        return <Typography>Unsupported result type</Typography>;
    }
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
              <ResultDisplay result={result} />
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
