import React from 'react';
import { TextField, FormControl, Input, MenuItem, Typography, Box } from '@mui/material';
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
      const handleFileValidation = (file: File): boolean => {
        // Check file size
        if (field.validation?.maxFileSize && 
            file.size > field.validation.maxFileSize * 1024 * 1024) {
          alert(`File size must be less than ${field.validation.maxFileSize}MB`);
          return false;
        }
        
        // Check file type
        if (field.validation?.fileTypes && field.validation.fileTypes.length > 0) {
          const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
          const fileType = file.type.toLowerCase();
          
          const isValidType = field.validation.fileTypes.some(type => {
            const normalizedType = type.toLowerCase();
            return normalizedType.startsWith('.') 
              ? fileExt === normalizedType  // Check extension (e.g. .pdf)
              : fileType.includes(normalizedType); // Check MIME type (e.g. pdf)
          });
          
          if (!isValidType) {
            alert(`Invalid file type. Accepted types: ${field.validation.fileTypes.join(', ')}`);
            return false;
          }
        }
        
        return true;
      };

      return (
        <FormControl fullWidth margin="normal">
          <TextField
            type="file"
            fullWidth
            label={field.label}
            InputProps={{
              inputProps: {
                accept: field.validation?.fileTypes
                  ?.map(type => type.startsWith('.') ? type : `.${type}`)
                  .join(',')
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                if (handleFileValidation(file)) {
                  onChange(file);
                } else {
                  e.target.value = ''; // Reset input if validation fails
                }
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
            Accepted types: {field.validation?.fileTypes?.join(', ') || '*'}. 
            Max size: {field.validation?.maxFileSize || 10}MB
          </Typography>
          
          {/* Add the PDF preview here */}
          {field.visualizeFile && value && (
            <Box sx={{ 
              mt: 2,
              height: '600px',
              borderRadius: 1,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <iframe
                src={URL.createObjectURL(value)}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="PDF Preview"
              />
            </Box>
          )}
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
