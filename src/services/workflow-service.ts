import { WorkflowTemplate, WorkflowExecution } from '../types/workflow-builder';

export class WorkflowService {
  private baseUrl = '/api/workflows';

  async getWorkflows(): Promise<WorkflowTemplate[]> {
    const response = await fetch(this.baseUrl);
    return response.json();
  }

  async getWorkflow(id: string): Promise<WorkflowTemplate> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async createWorkflow(workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
    });
    return response.json();
  }

  async updateWorkflow(id: string, workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
    });
    return response.json();
  }

  async deleteWorkflow(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  async executeWorkflow(id: string, data: any): Promise<WorkflowExecution> {
    const response = await fetch(`${this.baseUrl}/${id}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export const workflowService = new WorkflowService();
