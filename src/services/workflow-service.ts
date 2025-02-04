import { WorkflowTemplate, WorkflowExecution } from '../types/workflow-builder';
import { initialWorkflows } from '../mocks/initial-workflows';

export class WorkflowService {
  private static instance: WorkflowService;
  private workflows: WorkflowTemplate[] = [...initialWorkflows];

  constructor() {
    if (WorkflowService.instance) {
      return WorkflowService.instance;
    }
    WorkflowService.instance = this;
  }

  async getWorkflows(): Promise<WorkflowTemplate[]> {
    return this.workflows;
  }

  async getWorkflow(id: string): Promise<WorkflowTemplate> {
    const workflow = this.workflows.find(w => w.id === id);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    return Promise.resolve(workflow);
  }

  async createWorkflow(workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const newWorkflow = {
      ...workflow,
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      fields: workflow.fields || [],
      apiConfig: workflow.apiConfig || {
        endpoint: '',
        method: 'POST'
      }
    } as WorkflowTemplate;
    
    this.workflows.push(newWorkflow);
    return Promise.resolve(newWorkflow);
  }

  async updateWorkflow(id: string, workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Workflow not found');
    }
    
    const updatedWorkflow = {
      ...this.workflows[index],
      ...workflow,
      id // Ensure ID doesn't change
    };
    
    this.workflows[index] = updatedWorkflow;
    return Promise.resolve(updatedWorkflow);
  }

  async deleteWorkflow(id: string): Promise<void> {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Workflow not found');
    }
    
    this.workflows.splice(index, 1);
    return Promise.resolve();
  }

  async executeWorkflow(id: string, data: any): Promise<WorkflowExecution> {
    const workflow = await this.getWorkflow(id);
    return Promise.resolve({
      workflowId: id,
      status: 'completed',
      result: data,
      timestamp: new Date().toISOString()
    });
  }
}

export const workflowService = new WorkflowService();
