import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Divider, TextField, Alert } from '@mui/material';
import { workflowService } from '../../services/workflow-service';

// Place this component in src/components/debug/ApiDebugger.tsx

export const ApiDebugger: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<{ status: string; message: string } | null>(null);
  const [customUrl, setCustomUrl] = useState('/api/workflows');
  const [customResult, setCustomResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkApiConnection = async () => {
    try {
      const result = await workflowService.testConnection();
      setApiStatus(result);
    } catch (err) {
      setApiStatus({
        status: 'error',
        message: `Connection check failed: ${err instanceof Error ? err.message : String(err)}`
      });
    }
  };

  const testCustomEndpoint = async () => {
    setCustomResult(null);
    setError(null);
    
    try {
      const response = await fetch(customUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Try to parse as JSON
      try {
        const data = await response.json();
        setCustomResult(JSON.stringify(data, null, 2));
      } catch (parseErr) {
        // If not JSON, get as text
        const text = await response.text();
        setCustomResult(text.substring(0, 2000) + (text.length > 2000 ? '...' : ''));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const getNetworkInfo = () => {
    return {
      host: window.location.host,
      protocol: window.location.protocol,
      origin: window.location.origin,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent
    };
  };

  useEffect(() => {
    checkApiConnection();
  }, []);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>API Connection Debugger</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Network Information:</Typography>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '8px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {JSON.stringify(getNetworkInfo(), null, 2)}
        </pre>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">API Connection Status:</Typography>
        {apiStatus ? (
          <Alert severity={apiStatus.status === 'success' ? 'success' : 'error'}>
            {apiStatus.message}
          </Alert>
        ) : (
          <Typography>Checking connection...</Typography>
        )}
        <Button 
          variant="outlined" 
          size="small" 
          onClick={checkApiConnection}
          sx={{ mt: 1 }}
        >
          Recheck Connection
        </Button>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Test Custom Endpoint:</Typography>
        <TextField 
          fullWidth
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="Enter URL to test"
          size="small"
          sx={{ mb: 1 }}
        />
        <Button 
          variant="contained" 
          size="small" 
          onClick={testCustomEndpoint}
        >
          Test Endpoint
        </Button>
        
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        
        {customResult && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2">Result:</Typography>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '8px', 
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              {customResult}
            </pre>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ApiDebugger;