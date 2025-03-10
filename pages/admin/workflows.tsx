import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useWorkflow } from '../../src/contexts/WorkflowContext';
import { WorkflowList } from '../../src/components/admin/WorkflowList';
import { WorkflowForm } from '../../src/components/admin/WorkflowForm';
import { WorkflowTemplate } from '../../src/types/workflow-builder';

export default function AdminWorkflowsPage() {
  const { workflows, createWorkflow, updateWorkflow, deleteWorkflow } = useWorkflow();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTemplate | undefined>();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleCreate = () => {
    setSelectedWorkflow(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (workflow: WorkflowTemplate) => {
    setSelectedWorkflow(workflow);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkflow(id);
      setMessage({ text: 'Workflow deleted successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to delete workflow', type: 'error' });
    }
  };

  const handleSave = async (workflow: Partial<WorkflowTemplate>) => {
    try {
      if (selectedWorkflow) {
        await updateWorkflow(selectedWorkflow.id, workflow);
        setMessage({ text: 'Workflow updated successfully', type: 'success' });
      } else {
        await createWorkflow(workflow);
        setMessage({ text: 'Workflow created successfully', type: 'success' });
      }
      setIsFormOpen(false);
      // Force refresh the workflow list
      const workflowListElement = document.querySelector('.workflow-list');
      if (workflowListElement) {
        const event = new Event('refresh');
        workflowListElement.dispatchEvent(event);
      }
    } catch (error) {
      setMessage({ text: 'Failed to save workflow', type: 'error' });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Manage Workflows
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ 
            borderRadius: '25px',  // Use any value you want
          }}
        >
          Create Workflow
        </Button>
      </Box>

      <WorkflowList
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <WorkflowForm
        open={isFormOpen}
        workflow={selectedWorkflow}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
      />

      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
      >
        <Alert severity={message?.type} onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}
