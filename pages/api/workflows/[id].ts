import { NextApiRequest, NextApiResponse } from 'next';
import { workflowService } from '../../../src/services/workflow-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const workflowId = Array.isArray(id) ? id[0] : id;

  switch (req.method) {
    case 'GET':
      try {
        const workflow = await workflowService.getWorkflow(workflowId);
        return res.status(200).json(workflow);
      } catch (error) {
        return res.status(404).json({ error: 'Workflow not found' });
      }
    
    case 'PUT':
      try {
        const updatedWorkflow = await workflowService.updateWorkflow(workflowId, req.body);
        return res.status(200).json(updatedWorkflow);
      } catch (error) {
        return res.status(400).json({ error: 'Failed to update workflow' });
      }
    
    case 'DELETE':
      try {
        await workflowService.deleteWorkflow(workflowId);
        return res.status(204).end();
      } catch (error) {
        return res.status(400).json({ error: 'Failed to delete workflow' });
      }
    
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
