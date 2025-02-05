import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { WorkflowTemplate } from '../../types/workflow-builder';
import { workflowService } from '../../services/workflow-service';
import { WorkflowField } from './WorkflowField';

interface WorkflowExecutorProps {
  workflow: WorkflowTemplate;
}

export const WorkflowExecutor: React.FC<WorkflowExecutorProps> = ({ workflow }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await workflowService.executeWorkflow(workflow.id, formData);
      setResult(response.result);
      setError('');
      setIsCompleted(true);
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

  const handleReset = () => {
    setFormData({});
    setResult(null);
    setError('');
    setIsCompleted(false);
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
