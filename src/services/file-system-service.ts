import { WorkflowTemplate } from '../types/workflow-builder';
import { initialWorkflows } from '../mocks/initial-workflows';

export class FileSystemService {
  private static instance: FileSystemService;

  constructor() {
    if (FileSystemService.instance) {
      return FileSystemService.instance;
    }
    FileSystemService.instance = this;
  }

  async readWorkflows(): Promise<WorkflowTemplate[]> {
    return initialWorkflows;
  }

  async writeWorkflows(workflows: WorkflowTemplate[]): Promise<void> {
    try {
      const response = await fetch('/api/admin/workflows/persist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflows),
      });

      if (!response.ok) {
        throw new Error('Failed to save workflows');
      }
    } catch (error) {
      console.error('Error saving workflows:', error);
      throw error;
    }
  }
}

export const fileSystemService = new FileSystemService();
