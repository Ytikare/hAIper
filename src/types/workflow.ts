export interface Workflow {
  id: string;
  name: string;
  description: string;
  icon?: string;
  status: 'available' | 'coming_soon';
}

export interface WorkflowProgress {
  currentStep: number;
  totalSteps: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  stepDetails: string;
}
