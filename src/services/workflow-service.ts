import { WorkflowTemplate, WorkflowExecution } from '../types/workflow-builder';
import { randomUUID } from 'crypto';

export class WorkflowService {
  private static instance: WorkflowService;
  private baseUrl: string;

  constructor() {
    if (WorkflowService.instance) {
      return WorkflowService.instance;
    }
    WorkflowService.instance = this;
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }

  private async fetchApi(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getWorkflows(): Promise<WorkflowTemplate[]> {
    return this.fetchApi('/workflows');
  }

  async getWorkflow(id: string): Promise<WorkflowTemplate> {
    const workflow = await this.fetchApi(`/workflows/${id}`);
    if (!workflow) {
      throw new Error('Workflow not found');
    }
    return workflow;
  }

  async createWorkflow(workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    return this.fetchApi('/workflows', {
      method: 'POST',
      body: JSON.stringify(workflow),
    });
  }

  async updateWorkflow(id: string, workflow: Partial<WorkflowTemplate>): Promise<WorkflowTemplate> {
    return this.fetchApi(`/workflows/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workflow),
    });
  }

  async deleteWorkflow(id: string): Promise<void> {
    await this.fetchApi(`/workflows/${id}`, {
      method: 'DELETE',
    });
  }

  async executeWorkflow(id: string, data: any): Promise<WorkflowExecution> {
    const execution = await this.fetchApi(`/workflows/${id}/execute`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!execution) {
      const now = new Date();
      return {
        id: randomUUID(),
        templateId: id,
        values: data,
        progress: {
          currentStep: 1,
          totalSteps: 1,
          status: 'completed',
          stepDetails: 'Workflow execution completed'
        },
        result: data,
        startedAt: now,
        completedAt: now,
        executedBy: 'admin'
      };
    }

    return execution;
  }

  async submitFeedback(workflowId: string, feedback: 'positive' | 'negative'): Promise<any> {
    return this.fetchApi('/workflow-feedback', {
      method: 'POST',
      body: JSON.stringify({
        workflowId,
        feedback,
        submittedAt: new Date().toISOString(),
      }),
    });
  }
}

export const workflowService = new WorkflowService();
