import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkflowTemplate } from '../types/workflow-builder';
import { WorkflowService } from '../services/workflow-service';
import { initialWorkflows } from '../mocks/initial-workflows';

interface WorkflowContextType {
  workflows: WorkflowTemplate[];
  activeWorkflow?: WorkflowTemplate;
  setWorkflows: (workflows: WorkflowTemplate[]) => void;
  setActiveWorkflow: (workflow?: WorkflowTemplate) => void;
  createWorkflow: (workflow: Partial<WorkflowTemplate>) => Promise<void>;
  updateWorkflow: (id: string, workflow: Partial<WorkflowTemplate>) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
}

const WorkflowContext = createContext<WorkflowContextType>({} as WorkflowContextType);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>(initialWorkflows);
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowTemplate>();
  const workflowService = new WorkflowService();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const data = await workflowService.getWorkflows();
        setWorkflows(data);
      } catch (error) {
        console.error('Failed to fetch workflows:', error);
        // Fallback to initial workflows if API fails
        setWorkflows(initialWorkflows);
      }
    };

    fetchWorkflows();
  }, []);

  const createWorkflow = async (workflow: Partial<WorkflowTemplate>) => {
    const created = await workflowService.createWorkflow(workflow);
    setWorkflows([...workflows, created]);
  };

  const updateWorkflow = async (id: string, workflow: Partial<WorkflowTemplate>) => {
    const updated = await workflowService.updateWorkflow(id, workflow);
    setWorkflows(workflows.map(w => w.id === id ? updated : w));
  };

  const deleteWorkflow = async (id: string) => {
    await workflowService.deleteWorkflow(id);
    setWorkflows(workflows.filter(w => w.id !== id));
  };

  return (
    <WorkflowContext.Provider 
      value={{
        workflows,
        activeWorkflow,
        setWorkflows,
        setActiveWorkflow,
        createWorkflow,
        updateWorkflow,
        deleteWorkflow
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);
