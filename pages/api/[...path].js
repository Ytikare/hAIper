// This file serves as a proxy to the backend API
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const { path } = req.query;
    const apiUrl = `http://127.0.0.1:8000/api/${Array.isArray(path) ? path.join('/') : path}`;
    
    console.log(`Proxying request to: ${apiUrl}`);
    
    try {
      // Forward the request to the backend API
      const headers = {
        'Content-Type': 'application/json',
        // Forward other relevant headers
        ...Object.entries(req.headers)
          .filter(([key]) => !['host', 'connection', 'content-length'].includes(key.toLowerCase()))
          .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
      };
  
      // Handle form data if needed
      let body = undefined;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        body = JSON.stringify(req.body);
      }
  
      const response = await fetch(apiUrl, {
        method: req.method,
        headers,
        body
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        return res.status(response.status).json(data);
      } else {
        // For non-JSON responses (like files)
        const data = await response.text();
        res.status(response.status).send(data);
      }
    } catch (error) {
      console.error('API proxy error:', error);
      res.status(500).json({ error: 'Failed to fetch from API', details: error.message });
    }
  }