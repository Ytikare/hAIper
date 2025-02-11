import React, { useEffect, useState } from 'react';
import { workflowService } from '../../services/workflow-service';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { WorkflowTemplate } from '../../types/workflow-builder';

interface WorkflowListProps {
  onEdit: (workflow: WorkflowTemplate) => void;
  onDelete: (id: string) => void;
}

export const WorkflowList: React.FC<WorkflowListProps> = ({
  onEdit,
  onDelete,
}) => {
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkflows = async () => {
      try {
        const response = await workflowService.getWorkflows();
        setWorkflows(response);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  if (loading) {
    return <div>Loading workflows...</div>;
  }
  useEffect(() => {
    fetchWorkflows();
    
    // Add refresh event listener
    const element = document.querySelector('.workflow-list');
    if (element) {
      element.addEventListener('refresh', fetchWorkflows);
      return () => element.removeEventListener('refresh', fetchWorkflows);
    }
  }, []);

  return (
    <TableContainer
      className="workflow-list"
      component={Paper} 
      sx={{
        borderRadius: 2,
        boxShadow: (theme) => theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.4)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(241, 245, 249, 0.9))',
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(241, 245, 249, 0.8)',
            }}>
              Name
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(241, 245, 249, 0.8)',
            }}>
              Description
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(241, 245, 249, 0.8)',
            }}>
              Category
            </TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(241, 245, 249, 0.8)',
            }}>
              Fields
            </TableCell>
            <TableCell align="right" sx={{ 
              fontWeight: 600, 
              fontSize: '0.875rem',
              background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(241, 245, 249, 0.8)',
            }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workflows.map((workflow) => (
            <TableRow 
              key={workflow.id}
              sx={{
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.5)'
                    : 'rgba(241, 245, 249, 0.5)',
                },
                transition: 'background-color 0.2s ease',
              }}
            >
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {workflow.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {workflow.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Chip 
                    label={workflow.category}
                    size="small"
                    sx={{
                      background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ListAltIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Chip 
                    label={`${workflow.fields.length} fields`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Edit workflow">
                  <IconButton 
                    onClick={() => onEdit(workflow)}
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': { 
                        color: 'primary.dark',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete workflow">
                  <IconButton 
                    onClick={() => onDelete(workflow.id)}
                    sx={{ 
                      color: 'error.main',
                      '&:hover': { 
                        color: 'error.dark',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
