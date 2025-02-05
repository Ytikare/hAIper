import fs from 'fs';
import path from 'path';
import { WorkflowTemplate } from '../types/workflow-builder';

export class FileSystemService {
  private static instance: FileSystemService;
  private readonly filePath: string;

  constructor() {
    if (FileSystemService.instance) {
      return FileSystemService.instance;
    }
    this.filePath = path.join(process.cwd(), 'src', 'mocks', 'initial-workflows.ts');
    FileSystemService.instance = this;
  }

  async readWorkflows(): Promise<WorkflowTemplate[]> {
    try {
      const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');
      // Extract the array from the TypeScript file
      const match = fileContent.match(/initialWorkflows:\s*WorkflowTemplate\[\]\s*=\s*(\[[\s\S]*?\]);/);
      if (!match) throw new Error('Could not parse workflows file');
      
      // Evaluate the array string (safe since we control the file)
      const workflowsStr = match[1].replace(/new Date\(\)/g, 'new Date().toISOString()');
      return JSON.parse(workflowsStr);
    } catch (error) {
      console.error('Error reading workflows:', error);
      return [];
    }
  }

  async writeWorkflows(workflows: WorkflowTemplate[]): Promise<void> {
    try {
      const fileContent = `import { WorkflowTemplate } from '../types/workflow-builder';

export const initialWorkflows: WorkflowTemplate[] = ${JSON.stringify(workflows, null, 2)
        .replace(/"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)"/g, 'new Date()')
        .replace(/\n/g, '\n  ')};
`;
      await fs.promises.writeFile(this.filePath, fileContent, 'utf-8');
    } catch (error) {
      console.error('Error writing workflows:', error);
      throw error;
    }
  }
}

export const fileSystemService = new FileSystemService();
