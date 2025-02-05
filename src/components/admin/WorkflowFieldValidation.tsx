import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface ValidationProps {
  type: string;
  validation: any;
  onChange: (validation: any) => void;
}

export const WorkflowFieldValidation: React.FC<ValidationProps> = ({
  type,
  validation,
  onChange,
}) => {
  const handleAddFileType = () => {
    const fileTypes = validation.fileTypes || [];
    onChange({ ...validation, fileTypes: [...fileTypes, ''] });
  };

  const handleAddOption = () => {
    const options = validation.options || [];
    onChange({ ...validation, options: [...options, ''] });
  };

  const handleRemoveFileType = (index: number) => {
    const fileTypes = [...(validation.fileTypes || [])];
    fileTypes.splice(index, 1);
    onChange({ ...validation, fileTypes });
  };

  const handleRemoveOption = (index: number) => {
    const options = [...(validation.options || [])];
    options.splice(index, 1);
    onChange({ ...validation, options });
  };

  switch (type) {
    case 'number':
      return (
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Min"
            type="number"
            value={validation.min || ''}
            onChange={(e) => onChange({ ...validation, min: e.target.value })}
            size="small"
          />
          <TextField
            label="Max"
            type="number"
            value={validation.max || ''}
            onChange={(e) => onChange({ ...validation, max: e.target.value })}
            size="small"
          />
          <TextField
            label="Step"
            type="number"
            value={validation.step || ''}
            onChange={(e) => onChange({ ...validation, step: e.target.value })}
            size="small"
          />
        </Box>
      );

    case 'text':
    case 'textarea':
      return (
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Min Length"
            type="number"
            value={validation.minLength || ''}
            onChange={(e) => onChange({ ...validation, minLength: e.target.value })}
            size="small"
          />
          <TextField
            label="Max Length"
            type="number"
            value={validation.maxLength || ''}
            onChange={(e) => onChange({ ...validation, maxLength: e.target.value })}
            size="small"
          />
          <TextField
            label="Pattern (regex)"
            value={validation.pattern || ''}
            onChange={(e) => onChange({ ...validation, pattern: e.target.value })}
            size="small"
          />
        </Box>
      );

    case 'file':
      return (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <InputLabel>Accepted File Types</InputLabel>
            <IconButton size="small" onClick={handleAddFileType}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {(validation.fileTypes || []).map((type: string, index: number) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  value={type}
                  onChange={(e) => {
                    const fileTypes = [...(validation.fileTypes || [])];
                    fileTypes[index] = e.target.value;
                    onChange({ ...validation, fileTypes });
                  }}
                  size="small"
                  placeholder="e.g. .pdf"
                  sx={{ width: 100 }}
                  InputProps={{
                    startAdornment: type && !type.startsWith('.') ? '.' : undefined
                  }}
                />
                <IconButton size="small" onClick={() => handleRemoveFileType(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <TextField
            label="Max File Size (MB)"
            type="number"
            value={validation.maxSize || ''}
            onChange={(e) => onChange({ ...validation, maxSize: e.target.value })}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
      );

    case 'select':
      return (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <InputLabel>Options</InputLabel>
            <IconButton size="small" onClick={handleAddOption}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {(validation.options || []).map((option: string, index: number) => (
              <Chip
                key={index}
                label={
                  <TextField
                    value={option}
                    onChange={(e) => {
                      const options = [...(validation.options || [])];
                      options[index] = e.target.value;
                      onChange({ ...validation, options });
                    }}
                    size="small"
                    sx={{ width: 120 }}
                  />
                }
                onDelete={() => handleRemoveOption(index)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>
      );

    default:
      return null;
  }
};
