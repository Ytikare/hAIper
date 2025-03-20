import { WorkflowTemplate, WorkflowExecution } from '../types/workflow-builder';
import { randomUUID } from 'crypto';

export class WorkflowService {
  private static instance: WorkflowService;

  constructor() {
    if (WorkflowService.instance) {
      return WorkflowService.instance;
    }
    WorkflowService.instance = this;
  }

  private async fetchApi(endpoint: string, options?: RequestInit) {
    // Add query cache buster to avoid caching issues
    const cacheBuster = `_t=${Date.now()}`;
    const hasQueryParams = endpoint.includes('?');
    const url = hasQueryParams ? `${endpoint}&${cacheBuster}` : `${endpoint}?${cacheBuster}`;
    
    try {
      // Use relative URL at the API path, which will be handled by either:
      // 1. Next.js API Routes (pages/api/[...path].js)
      // 2. Next.js Rewrites (next.config.js)
      // 3. IIS URL Rewrite rules
      const response = await fetch(`/api${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        // Add credentials for cookie handling if needed
        credentials: 'same-origin'
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  async getWorkflows(): Promise<WorkflowTemplate[]> {
    try {
      return await this.fetchApi('/workflows');
    } catch (error) {
      console.error('Failed to get workflows:', error);
      // Return empty array as fallback
      return [];
    }
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
    try {
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
    } catch (error) {
      console.error('Execute workflow error:', error);
      throw error;
    }
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

  // Helper method for debugging
  async testConnection(): Promise<{ status: string, message: string }> {
    try {
      await fetch('/api/workflows', {
        method: 'HEAD',
        cache: 'no-store'
      });
      return { status: 'success', message: 'API connection successful' };
    } catch (error) {
      return { status: 'error', message: `API connection failed: ${error.message}` };
    }
  }
}

export const workflowService = new WorkflowService();