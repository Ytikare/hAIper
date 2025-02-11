import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { WorkflowList } from './components/admin/WorkflowList';
import { WorkflowForm } from './components/admin/WorkflowForm';
import { WorkflowExecutor } from './components/workflow/WorkflowExecutor';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={typeof(WorkflowList)} />
      <Route path="/admin/workflows" element={typeof(WorkflowList)} />
      <Route path="/admin/workflows/new" element={typeof(WorkflowForm)} />
      <Route path="/admin/workflows/:id" element={typeof(WorkflowForm)} />
      <Route path="/workflows/:id" element={typeof(WorkflowExecutor)} />
    </Routes>
  );
};
