import { WorkflowTemplate, WorkflowExecution } from '../types/workflow-builder';
import { fileSystemService } from './file-system-service';

export class WorkflowService {
  private static instance: WorkflowService;
  private workflows: WorkflowTemplate[] = [];

  constructor() {
    if (WorkflowService.instance) {
      return WorkflowService.instance;
    }
    WorkflowService.instance = this;
    this.loadWorkflows();
  }

  private async loadWorkflows(): Promise<void> {
    this.workflows = await fileSystemService.readWorkflows();
  }

  private async saveWorkflows(): Promise<void> {
    await fileSystemService.writeWorkflows(this.workflows);
  }

  async getWorkflows(): Promise<WorkflowTemplate[]> {
    await this.loadWorkflows();
    return this.workflows;
  }

  async getWorkflow(id: string): Promise<WorkflowTemplate> {
    await this.loadWorkflows();
    const workflow = this.workflows.find(w => w.id === id);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    return workflow;
  }

  async createWorkflow(workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const newWorkflow = {
      ...workflow,
      id: Math.random().toString(36).substr(2, 9),
      fields: workflow.fields || [],
      apiConfig: workflow.apiConfig || {
        endpoint: '',
        method: 'POST'
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      isPublished: false,
      status: 'available',
      createdBy: 'admin'
    } as WorkflowTemplate;
    
    this.workflows.push(newWorkflow);
    await this.saveWorkflows();
    return newWorkflow;
  }

  async updateWorkflow(id: string, workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Workflow not found');
    }
    
    const updatedWorkflow = {
      ...this.workflows[index],
      ...workflow,
      id,
      updatedAt: new Date()
    };
    
    this.workflows[index] = updatedWorkflow;
    await this.saveWorkflows();
    return updatedWorkflow;
  }

  async deleteWorkflow(id: string): Promise<void> {
    const index = this.workflows.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Workflow not found');
    }
    
    this.workflows.splice(index, 1);
    await this.saveWorkflows();
  }

  async executeWorkflow(id: string, data: any): Promise<WorkflowExecution> {
    const workflow = await this.getWorkflow(id);
    return {
      workflowId: id,
      status: 'completed',
      result: data,
      timestamp: new Date().toISOString()
    };
  }
}

export const workflowService = new WorkflowService();
