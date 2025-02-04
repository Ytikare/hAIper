import React, { createContext, useContext, useState } from 'react';
import { WorkflowTemplate } from '../types/workflow-builder';
import { workflowService } from '../services/workflow-service';
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
