import React from 'react';
import { TextField, FormControl, Input } from '@mui/material';
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
      return (
        <FormControl fullWidth margin="normal">
          <Input
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(file);
              }
            }}
            required={field.required}
            accept={field.validation?.fileTypes?.join(',')}
          />
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
            <option key={option} value={option}>
              {option}
            </option>
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
