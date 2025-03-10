import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Paper, Card, CardContent, Grid, Chip, Divider, useTheme } from '@mui/material';
import { WorkflowFeedback } from './WorkflowFeedback';
import { WorkflowProgress } from '../../types/workflow';
import { WorkflowProgressStepper } from './WorkflowProgressStepper';
import { WorkflowTemplate } from '../../types/workflow-builder';
import { WorkflowField } from './WorkflowField';
import { renderJsonContent } from './executor_components/renderJsonContent';

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
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
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

    let url = apiConfig.endpoint;
    const requestOptions: RequestInit = {
      method: apiConfig.method,
      headers: {
        ...apiConfig.headers,
      },
    };

    // Handle different HTTP methods
    if (!apiConfig.method || !['GET', 'HEAD'].includes(apiConfig.method.toUpperCase())) {
      // For POST, PUT, DELETE, PATCH etc.
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        }
      });

      // Transform request data if transformer is provided
      const finalData = apiConfig.transformRequest 
        ? apiConfig.transformRequest(formData)
        : formData;

      requestOptions.body = finalData;
    } else {
      // For GET/HEAD, convert data to URL parameters
      const params = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (!(value instanceof File)) { // Skip files for GET requests
          params.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        }
      });
      // Append params to URL
      url = `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
    }

    const response = await fetch(url, requestOptions);

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
      
      // Step 3: Processing
      updateProgress(2, 'in_progress', 'Processing response...');
      const response = await executeWorkflowAPI(formData);
      
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
    setFeedback(null);
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
          <Box sx={{ 
            mt: 2,
            p: 3,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider',
            fontFamily: 'monospace'
          }}>
            {renderJsonContent(result.data)}
          </Box>
        );
      
      case 'image':
        return (
          <Box sx={{ 
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <img 
              src={result.data} 
              alt="Result" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                borderRadius: '4px',
              }} 
            />
          </Box>
        );
      
      case 'pdf':
        return (
          <Box sx={{ 
            mt: 2,
            height: '600px',
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <iframe
              src={result.data}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="PDF Result"
            />
          </Box>
        );
      
      case 'text':
        return (
          <Box sx={{ 
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography 
              variant="body2"
              sx={{ 
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                color: 'text.primary'
              }}
            >
              {result.data}
            </Typography>
          </Box>
        );
      
      case 'blob':
        return (
          <Box sx={{ 
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Chip 
              label="File Ready" 
              color="success" 
              size="small" 
              variant="outlined"
            />
            <Button 
              variant="contained" 
              href={result.data} 
              download
              size="small"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              Download File
            </Button>
          </Box>
        );
    }
  };

  if (isCompleted) {
    return (
      <Paper
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none'
        }}
      >
        <Box>
          <Typography variant="subtitle1" color="success.main" sx={{ mb: 2 }}>
            ✓ Workflow completed successfully!
          </Typography>
          {result && (
            <Box sx={{ mt: 3 }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                Result:
              </Typography>
              <ResultDisplay result={result} />
            </Box>
          )}
          <WorkflowFeedback 
            feedback={feedback}
            onFeedbackChange={setFeedback}
            workflowId={workflow.id}
          />
          <Button
            variant="outlined"
            onClick={handleReset}
            size="small"
            sx={{ mt: 2 }}
          >
            Start New Workflow
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
      <Paper
        elevation={3}
        sx={(theme) => ({
          p: 4,
          borderRadius: 3,
          position: 'relative',
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[6],
          }
        })}
      >
        <form onSubmit={handleSubmit}>
        <WorkflowProgressStepper progress={progress} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ 
                borderRadius: '25px',  // Use any value you want
              }}
            >
              Execute Workflow
            </Button>
          </Box>
        </Box>
      </form>
      </Paper>
  );
};
