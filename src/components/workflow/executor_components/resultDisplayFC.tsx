import { Box, Typography, Chip, Button } from "@mui/material";
import { renderJsonContent } from "./renderJsonContent";

type ContentTypeResponse = {
    type: string;
    data: any;
  };
  

export const ResultDisplay: React.FC<{ result: ContentTypeResponse }> = ({ result }) => {
    switch (result.type) {
      case 'json':
        return (
          <Box sx={{ 
            mt: 2,
            p: 3,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider',
            fontFamily: 'monospace'
          }}>
            {renderJsonContent(result.data)}
          </Box>
        );
      
      case 'image':
        return (
          <Box sx={{ 
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider',
            pointerEvents: 'auto',
            userSelect: 'text'
          }}>
            <img 
              src={result.data} 
              alt="Result" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                borderRadius: '4px',
              }} 
            />
          </Box>
        );
      
      case 'pdf':
        return (
          <Box sx={{ 
            mt: 2,
            height: '600px',
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <iframe
              src={result.data}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="PDF Result"
              allowFullScreen={true}
            />
          </Box>
        );
      
      case 'text':
        return (
          <Box sx={{ 
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography 
              variant="body2"
              sx={{ 
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                color: 'text.primary'
              }}
            >
              {result.data}
            </Typography>
          </Box>
        );
      
      case 'blob':
        return (
          <Box sx={{ 
            mt: 2,
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(30, 41, 59, 0.2)' 
              : 'rgba(241, 245, 249, 0.2)',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Chip 
              label="File Ready" 
              color="success" 
              size="small" 
              variant="outlined"
            />
            <Button 
              variant="contained" 
              href={result.data} 
              download
              size="small"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              Download File
            </Button>
          </Box>
        );
    }
  };
