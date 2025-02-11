import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { WorkflowFieldValidation } from './WorkflowFieldValidation';
import { WorkflowTemplate, WorkflowField } from '../../types/workflow-builder';

interface WorkflowFormProps {
  open: boolean;
  workflow?: WorkflowTemplate;
  onClose: () => void;
  onSave: (workflow: Partial<WorkflowTemplate>) => void;
}

export const WorkflowForm: React.FC<WorkflowFormProps> = ({
  open,
  workflow,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<WorkflowTemplate>>({
    name: '',
    description: '',
    category: '',
    fields: [],
    apiConfig: {
      endpoint: '',
      method: 'POST',
    },
  });

  useEffect(() => {
    if (workflow) {
      setFormData(workflow);
    }
  }, [workflow]);

  const handleAddField = () => {
    setFormData((prev) => {
      const newField: WorkflowField = {
        id: crypto.randomUUID(),
        label: '',
        type: 'text',
        required: false,
        validation: {},
        options: []
      };
      return {
        ...prev,
        fields: [...(prev.fields || []), newField]
      };
    });
  };

  const handleRemoveField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 1), rgba(15, 23, 42, 1))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(241, 245, 249, 1))',
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(241, 245, 249, 0.95))',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2,
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {workflow ? 'Edit Workflow' : 'Create New Workflow'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
            />
            <TextField
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 1
                }}
              >
                API Configuration
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="API Endpoint"
                  value={formData.apiConfig?.endpoint || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    apiConfig: { ...(formData.apiConfig || {}), endpoint: e.target.value }
                  })}
                  placeholder="https://api.example.com/endpoint"
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Method</InputLabel>
                  <Select
                    value={formData.apiConfig?.method || 'GET'}
                    label="Method"
                    onChange={(e) => setFormData({
                      ...formData,
                      apiConfig: { ...(formData.apiConfig || {}), method: e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE' }
                    })}
                  >
                    <MenuItem value="GET">GET</MenuItem>
                    <MenuItem value="POST">POST</MenuItem>
                    <MenuItem value="PUT">PUT</MenuItem>
                    <MenuItem value="DELETE">DELETE</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 2
                }}
              >
                Fields
              </Typography>
              {formData.fields?.map((field, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    mb: 2, 
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 1,
                    bgcolor: (theme) => theme.palette.mode === 'dark'
                      ? 'rgba(30, 41, 59, 0.4)'
                      : 'rgba(241, 245, 249, 0.4)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <TextField
                    label="Field Label"
                    value={field.label}
                    onChange={(e) => {
                      const newFields = [...(formData.fields || [])];
                      newFields[index] = { ...field, label: e.target.value };
                      setFormData({ ...formData, fields: newFields });
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={field.type}
                      label="Type"
                      onChange={(e) => {
                        const newFields = [...(formData.fields || [])];
                        newFields[index] = { 
                          ...field, 
                          type: e.target.value as 'text' | 'number' | 'dropdown' | 'file' | 'multiselect' | 'date' | 'textarea',
                          validation: {}
                        };
                        setFormData({ ...formData, fields: newFields });
                      }}
                    >
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="textarea">Text Area</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="file">File</MenuItem>
                      <MenuItem value="select">Select</MenuItem>
                    </Select>
                  </FormControl>
                  <WorkflowFieldValidation
                    type={field.type}
                    validation={field.validation || {}}
                    onChange={(validation) => {
                      const newFields = [...(formData.fields || [])];
                      newFields[index] = { ...field, validation };
                      setFormData({ ...formData, fields: newFields });
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.required || false}
                        onChange={(e) => {
                          const newFields = [...(formData.fields || [])];
                          newFields[index] = { ...field, required: e.target.checked };
                          setFormData({ ...formData, fields: newFields });
                        }}
                      />
                    }
                    label="Required"
                  />
                  <IconButton onClick={() => handleRemoveField(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddField}
                variant="outlined"
                sx={{
                  borderColor: (theme) => theme.palette.mode === 'dark' ? 'primary.main' : 'primary.light',
                  //color: (theme) => theme.palette.mode === 'dark' ? 'primary.main' : 'primary.light',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : 'rgba(99, 102, 241, 0.08)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(99, 102, 241, 0.15)',
                  }
                }}
              >
                Add Field
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: '1px solid',
          borderColor: 'divider',
          px: 3,
          py: 2,
        }}>
          <Button 
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.mode === 'dark' ? 'white.900' : 'white.1000',
              '&:hover': {
                bgcolor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5558e8, #7c4def)',
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
