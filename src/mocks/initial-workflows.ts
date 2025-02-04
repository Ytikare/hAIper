import { WorkflowTemplate } from '../types/workflow-builder';

export const initialWorkflows: WorkflowTemplate[] = [
  {
    id: '1',
    name: 'CV Analysis',
    description: 'Analyze CVs and extract key information',
    icon: '/icons/cv.png',
    status: 'available',
    fields: [
      {
        id: 'cv-upload',
        name: 'cvFile',
        type: 'file',
        label: 'Upload CV',
        required: true,
        validation: {
          fileTypes: ['.pdf', '.doc', '.docx']
        }
      }
    ],
    apiConfig: {
      endpoint: '/api/analyze-cv',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    category: 'HR',
    version: 1,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  },
  {
    id: '2',
    name: 'IT Helper',
    description: 'Get AI assistance for IT issues',
    icon: '/icons/it.png',
    status: 'available',
    fields: [
      {
        id: 'problem',
        name: 'problem',
        type: 'textarea',
        label: 'Describe your IT issue',
        required: true
      }
    ],
    apiConfig: {
      endpoint: '/api/it-helper',
      method: 'POST'
    },
    category: 'Support',
    version: 1,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  }
];
