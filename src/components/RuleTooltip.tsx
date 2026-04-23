import React from 'react';
import { 
  Tooltip, 
  Typography, 
  Box 
} from '@mui/material';
import { GeneralIcon } from './GeneralIcon';
import { ModifierIcon } from './ModifierIcon';



export function renderTextWithTooltips(text: string, glossary: any, depth = 0) {
  if (!text) return null;
  
  // 1. Process <TAG> placeholders first on the raw string
  const tagRegex = /(<[^>]+>)/g;
  const initialParts = text.split(tagRegex);
  let elements: any[] = [];
  
  initialParts.forEach((part, i) => {
    if (part.match(tagRegex)) {
      const inner = part.replace(/[<>]/g, '');
      // Check if it's a modifier (e.g., +1, +2, 2X)
      // Standardize to uppercase for matching
      const cleanInner = inner.trim().toUpperCase();
      
      if (cleanInner.match(/^[\+\-]?\d+X?$/)) {
        elements.push(<ModifierIcon key={`tag-${i}`} modifier={cleanInner.toLowerCase()} size={18} />);
      } else if (cleanInner.startsWith('MODIFIER:')) {
        // Handle tags like <Modifier: -1 x2>
        // Extract the actual modifier part
        const modPart = cleanInner.replace('MODIFIER:', '').trim().split(' ')[0];
        elements.push(
          <Box component="span" key={`tag-mod-${i}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <ModifierIcon modifier={modPart.toLowerCase()} size={18} />
            <Typography component="span" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {inner.replace(/Modifier:/i, '').trim()}
            </Typography>
          </Box>
        );
      } else {
        elements.push(<GeneralIcon key={`tag-${i}`} icon={cleanInner} glossary={glossary} />);
      }
    } else if (part) {
      elements.push(part);
    }
  });

  
  // 4. Glossary tooltips
  Object.keys(glossary).forEach(term => {
    const termElements: any = [];
    elements.forEach((el: any) => {
      if (typeof el === 'string') {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        const parts = el.split(regex);
        parts.forEach((part, i) => {
          if (part.toLowerCase() === term.toLowerCase()) {
            termElements.push(
              <Tooltip 
                key={`${term}-${i}-${depth}`}
                title={
                  <Box sx={{ p: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#38bdf8', mb: 0.5, borderBottom: '1px solid rgba(56, 189, 248, 0.2)', pb: 0.5 }}>
                      {term.toUpperCase()}
                    </Typography>
                    <Box sx={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {depth < 2 ? renderTextWithTooltips(glossary[term], glossary, depth + 1) : glossary[term]}
                    </Box>
                  </Box>
                }
                arrow
                placement="top"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ],
                  },
                  tooltip: {
                    sx: {
                      bgcolor: 'rgba(15, 23, 42, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                      '& .MuiTooltip-arrow': {
                        color: 'rgba(15, 23, 42, 0.95)',
                        '&::before': {
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                        }
                      }
                    }
                  }
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    color: '#38bdf8', 
                    fontWeight: 600, 
                    borderBottom: '1px dashed rgba(56, 189, 248, 0.5)',
                    cursor: 'help',
                    '&:hover': {
                      color: '#7dd3fc',
                      bgcolor: 'rgba(56, 189, 248, 0.1)'
                    }
                  }}
                >
                  {part}
                </Box>
              </Tooltip>
            );
          } else if (part) {
            termElements.push(part);
          }
        });
      } else {
        termElements.push(el);
      }
    });
    elements = termElements;
  });
  
  return <>{elements.map((el: any, i: number) => <React.Fragment key={i}>{el}</React.Fragment>)}</>;
}
