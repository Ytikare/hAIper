import React, { createContext, useContext, useState } from 'react';
import { Workflow, WorkflowTemplate, WorkflowExecution } from '../types/workflow-builder';

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
  const [workflows, setWorkflows] = useState<WorkflowTemplate[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowTemplate>();

  const createWorkflow = async (workflow: Partial<WorkflowTemplate>) => {
    // API call to create workflow
  };

  const updateWorkflow = async (id: string, workflow: Partial<WorkflowTemplate>) => {
    // API call to update workflow
  };

  const deleteWorkflow = async (id: string) => {
    // API call to delete workflow
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
