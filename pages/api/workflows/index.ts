import { NextApiRequest, NextApiResponse } from 'next';
import { workflowService } from '../../../src/services/workflow-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const workflows = await workflowService.getWorkflows();
      return res.status(200).json(workflows);
    
    case 'POST':
      try {
        const newWorkflow = await workflowService.createWorkflow(req.body);
        return res.status(201).json(newWorkflow);
      } catch (error) {
        return res.status(400).json({ error: 'Failed to create workflow' });
      }
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
