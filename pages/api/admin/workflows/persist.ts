import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { WorkflowTemplate } from '../../../../src/types/workflow-builder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'mocks', 'initial-workflows.ts');
    const workflows: WorkflowTemplate[] = req.body;

    const fileContent = `import { WorkflowTemplate } from '../types/workflow-builder';

export const initialWorkflows: WorkflowTemplate[] = ${JSON.stringify(workflows, null, 2)
      .replace(/"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)"/g, 'new Date()')
      .replace(/\n/g, '\n  ')};
`;

    await fs.promises.writeFile(filePath, fileContent, 'utf-8');
    res.status(200).json({ message: 'Workflows saved successfully' });
  } catch (error) {
    console.error('Error saving workflows:', error);
    res.status(500).json({ message: 'Error saving workflows' });
  }
}
