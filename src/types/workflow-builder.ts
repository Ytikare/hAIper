import { Workflow, WorkflowProgress } from './workflow';

export interface WorkflowField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'dropdown' | 'file' | 'multiselect' | 'date' | 'textarea';
  label: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: any;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    fileTypes?: string[];
    maxFileSize?: number;
    customValidation?: (value: any) => boolean | string;
  };
  visibility?: {
    dependsOn?: string; // ID of another field
    condition?: (value: any) => boolean;
  };
}

export interface WorkflowTemplate extends Workflow {
  fields: WorkflowField[];
  apiConfig: {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    transformRequest?: (data: any) => any;
    transformResponse?: (data: any) => any;
  };
  category: string;
  version: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  permissions?: {
    roles: string[];
    users: string[];
  };
}

export interface WorkflowExecution {
  id: string;
  templateId: string;
  values: Record<string, any>;
  progress: WorkflowProgress;
  result?: any;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
  executedBy: string;
}
