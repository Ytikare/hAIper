import React from 'react';
import { TextField, FormControl, Input, MenuItem, Typography } from '@mui/material';
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
      const acceptedTypes = field.validation?.fileTypes?.join(', ') || '*';
      const maxSize = field.validation?.maxFileSize || 10;
      const acceptedFileTypes = field.validation?.fileTypes?.map(type => 
        type.startsWith('.') ? type : `.${type}`
      ).join(',');

      return (
        <FormControl fullWidth margin="normal">
          <TextField
            type="file"
            fullWidth
            label={field.label}
            InputProps={{
              inputProps: {
                accept: acceptedFileTypes
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                // Check file size
                if (field.validation?.maxFileSize && 
                    file.size > field.validation.maxFileSize * 1024 * 1024) {
                  alert(`File size must be less than ${field.validation.maxFileSize}MB`);
                  e.target.value = '';
                  return;
                }
                
                // Check file type
                if (field.validation?.fileTypes) {
                  const fileExt = file.name.split('.').pop()?.toLowerCase();
                  const isValidType = field.validation.fileTypes.some(type => 
                    type.toLowerCase() === fileExt ||
                    file.type.includes(type.toLowerCase())
                  );
                  
                  if (!isValidType) {
                    alert(`Invalid file type. Accepted types: ${acceptedTypes}`);
                    e.target.value = '';
                    return;
                  }
                }

                onChange(file);
              }
            }}
            required={field.required}
          />
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 0.5,
              color: 'text.secondary'
            }}
          >
            Accepted types: {acceptedTypes}. Max size: {maxSize}MB
          </Typography>
        </FormControl>
      );
    
    case 'dropdown':
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
