import { Box, Typography } from "@mui/material";

export const renderJsonContent = (data: any, level: number = 0) => {
      if (typeof data !== 'object' || data === null) {
        return (
          <span
          style={{ 
            fontFamily: 'monospace',
            color: typeof data === 'string' ? '#10B981' : '#3B82F6',
            wordBreak: 'break-word'
          }}
        >
          {typeof data === 'string' ? `"${data}"` : String(data)}
        </span>
        );
      }

      return (
        <Box sx={{ 
          ml: level > 0 ? 2 : 0,
          userSelect: 'text !important',
          pointerEvents: 'auto !important',
          userSelect: 'text',
          pointerEvents: 'auto',
          '& *': {
            userSelect: 'text',
            pointerEvents: 'auto'
          }
        }}>
          {Object.entries(data).map(([key, value], index) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 1.5,
                pl: level > 0 ? 2 : 0,
                borderLeft: level > 0 ? '2px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              {typeof value !== 'object' ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {key.replace(/_/g, ' ')}:
                  </Typography>
                  {renderJsonContent(value, level + 1)}
                </Box>
              ) : (
                <>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.85rem',
                      mb: 0.5,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {key.replace(/_/g, ' ')}
                  </Typography>
                  <Box sx={{ 
                    pl: 1,
                    py: typeof value === 'object' && value !== null ? 1 : 0
                  }}>
                    {renderJsonContent(value, level + 1)}
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
      );
    };
