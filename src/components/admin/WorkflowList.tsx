import React from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { WorkflowTemplate } from '../../types/workflow-builder';

interface WorkflowListProps {
  workflows: WorkflowTemplate[];
  onEdit: (workflow: WorkflowTemplate) => void;
  onDelete: (id: string) => void;
}

export const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Fields</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workflows.map((workflow) => (
            <TableRow key={workflow.id}>
              <TableCell>{workflow.name}</TableCell>
              <TableCell>{workflow.description}</TableCell>
              <TableCell>{workflow.category}</TableCell>
              <TableCell>{workflow.fields.length}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(workflow)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDelete(workflow.id)}>
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
