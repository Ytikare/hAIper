import React from 'react';
import { TextField, FormControl, Input, MenuItem } from '@mui/material';
import { WorkflowField as IWorkflowField } from '../../types/workflow-builder';

interface WorkflowFieldProps {
  field: IWorkflowField;
  value: any;
  onChange: (value: any) => void;
}

export const WorkflowField: React.FC<WorkflowFieldProps> = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'textarea':
      return (
        <TextField
          fullWidth
          multiline
          rows={4}
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          margin="normal"
        />
      );
    
    case 'number':
      return (
        <TextField
          fullWidth
          type="number"
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          margin="normal"
          inputProps={{
            min: field.validation?.min,
            max: field.validation?.max,
            step: field.validation?.step
          }}
        />
      );
    
    case 'email':
      return (
        <TextField
          fullWidth
          type="email"
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          margin="normal"
        />
      );
    
    case 'date':
      return (
        <TextField
          fullWidth
          type="date"
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      );
    
    case 'file':
      const acceptedTypes = field.validation?.fileTypes?.map(type => 
        type.startsWith('.') ? type : `.${type}`
      ).join(',');
      
      return (
        <FormControl fullWidth margin="normal">
          <TextField
            type="file"
            fullWidth
            InputProps={{
              inputProps: {
                accept: acceptedTypes
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                // Check file size if maxSize is specified
                if (field.validation?.maxSize && file.size > field.validation.maxSize * 1024 * 1024) {
                  alert(`File size must be less than ${field.validation.maxSize}MB`);
                  e.target.value = '';
                  return;
                }
                
                // Check file type
                if (acceptedTypes && !acceptedTypes.split(',').some(type => 
                  file.name.toLowerCase().endsWith(type.toLowerCase())
                )) {
                  alert(`File type not allowed. Accepted types: ${acceptedTypes}`);
                  e.target.value = '';
                  return;
                }
                
                onChange(file);
              }
            }}
            required={field.required}
          />
          {acceptedTypes && (
            <small style={{ 
              marginTop: '4px', 
              color: (theme) => theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.7)' 
                : 'rgba(0, 0, 0, 0.6)'
            }}>
              Accepted file types: {acceptedTypes}
            </small>
          )}
        </FormControl>
      );
    
    case 'select':
      return (
        <TextField
          select
          fullWidth
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          margin="normal"
        >
          {field.validation?.options?.map((option: string) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );
    
    default:
      return (
        <TextField
          fullWidth
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          margin="normal"
        />
      );
  }
};
