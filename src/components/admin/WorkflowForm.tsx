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
import { WorkflowTemplate } from '../../types/workflow-builder';

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
    setFormData(prev => ({
      ...prev,
      fields: [...(prev.fields || []), { 
        label: '', 
        type: 'text', 
        required: false,
        validation: {}
      }],
    }));
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {workflow ? 'Edit Workflow' : 'Create New Workflow'}
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
              <Typography variant="h6">Fields</Typography>
              {formData.fields?.map((field, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
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
                          type: e.target.value,
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
              >
                Add Field
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
