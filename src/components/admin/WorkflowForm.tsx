import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<WorkflowTemplate>>({
    id: crypto.randomUUID(),
    name: '',
    description: '',
    category: '',
    fields: [],
    apiConfig: {
      endpoint: '',
      method: 'POST',
      headers: {},
      transformRequest: (data: any) => data,
      transformResponse: (data: any) => data,
    },
    status: 'available',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  useEffect(() => {
    if (workflow) {
      setFormData(workflow);
    }
  }, [workflow]);

  const handleAddField = () => {
    setFormData((prev) => {
      const fieldId = crypto.randomUUID();
      const newField: WorkflowField = {
        id: fieldId,
        name: `field_${fieldId.slice(0, 8)}`,
        label: '',
        type: 'text',
        required: false,
        placeholder: '',
        defaultValue: '',
        validation: {
          options: undefined,
          maxSize: 0,
          step: undefined,
          min: undefined,
          max: undefined,
          pattern: undefined
        },
        options: [],
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
    const workflowToSave = {
      ...formData,
      updatedAt: new Date(),
      fields: formData.fields?.map(field => ({
        ...field,
        validation: field.validation || {
          options: undefined,
          maxSize: 0,
          step: undefined,
          min: undefined,
          max: undefined,
          pattern: undefined
        }
      }))
    };
    onSave(workflowToSave);
    router.push('/admin/workflows');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      className="workflow-form"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle className="form-header">
          <Typography variant="h5" className="app-title">
            {workflow ? 'Edit Workflow' : 'Create New Workflow'}
          </Typography>
        </DialogTitle>
        <DialogContent className="form-content">
          <Box className="field-container">
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
                    apiConfig: { 
                      ...(formData.apiConfig || { method: 'GET' as const }), 
                      endpoint: e.target.value 
                    }
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
                      apiConfig: { 
                        ...(formData.apiConfig || { endpoint: '' }), 
                        method: e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE' 
                      }
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
                  className="card"
                >
                  <TextField
                    label="Field Label"
                    value={field.label}
                    onChange={(e) => {
                      const newFields = [...(formData.fields || [])];
                      const newLabel = e.target.value;
                      const newName = newLabel.toLowerCase().replace(/\s+/g, '_');
                      newFields[index] = { 
                        ...field, 
                        label: newLabel,
                        name: newName
                      };
                      setFormData({ ...formData, fields: newFields });
                    }}
                    sx={{ flexGrow: 1 }}
                    required
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
                          validation: {
                            options: undefined,
                            maxSize: 0,
                            step: undefined
                          }
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
                      const updatedValidation = field.type === 'number' 
                        ? {
                            ...validation,
                            min: validation.min ? Number(validation.min) : undefined,
                            max: validation.max ? Number(validation.max) : undefined
                          }
                        : validation;
                      newFields[index] = { ...field, validation: updatedValidation };
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
        <DialogActions className="form-footer">
          <Button onClick={onClose} className="btn btn-outline">
            Cancel
          </Button>
          <Button type="submit" className="btn btn-primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
