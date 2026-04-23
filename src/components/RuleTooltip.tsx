import React from 'react';
import { 
  Tooltip, 
  Typography, 
  Box 
} from '@mui/material';
import { ElementIcon } from './ElementIcon';
import { ConditionIcon } from './ConditionIcon';
import { GeneralIcon } from './GeneralIcon';
import { ModifierIcon } from './ModifierIcon';



export function renderTextWithTooltips(text: string, glossary: any, depth = 0) {
  if (!text) return null;
  
  // 1. Process <TAG> placeholders first on the raw string
  const tagRegex = /(<[A-Z0-9_\-\+]+>)/g;
  const initialParts = text.split(tagRegex);
  let elements: any[] = [];
  
  initialParts.forEach((part, i) => {
    if (part.match(tagRegex)) {
      const inner = part.replace(/[<>]/g, '');
      // Check if it's a modifier (e.g., +1, +2, 2X)
      if (inner.match(/^[\+\-]?\d+X?$/i)) {
        elements.push(<ModifierIcon key={`tag-${i}`} modifier={inner.toLowerCase()} size={18} />);
      } else {
        elements.push(<GeneralIcon key={`tag-${i}`} icon={inner} glossary={glossary} />);
      }
    } else if (part) {
      elements.push(part);
    }
  });

  // 2. Replace element names
  const elementNames = ['Fire', 'Ice', 'Air', 'Earth', 'Light', 'Dark', 'Wild'];
  elementNames.forEach(name => {
    const nextElements: any = [];
    elements.forEach((el: any) => {
      if (typeof el === 'string') {
        const regex = new RegExp(`\\b(${name})\\b`, 'gi');
        const parts = el.split(regex);
        parts.forEach((part, i) => {
          if (part.toLowerCase() === name.toLowerCase()) {
            nextElements.push(<ElementIcon key={`${name}-${i}`} element={part} size={18} />);
          } else if (part) {
            nextElements.push(part);
          }
        });
      } else {
        nextElements.push(el);
      }
    });
    elements = nextElements;
  });

  // 3. Replace condition names
  const conditionNames = [
    'Poison', 'Wound', 'Muddle', 'Immobilize', 'Disarm', 
    'Stun', 'Invisible', 'Strengthen', 'Bless', 'Curse',
    'Ward', 'Brittle', 'Bane', 'Impair', 'Regenerate'
  ];
  conditionNames.forEach(name => {
    const nextElements: any = [];
    elements.forEach((el: any) => {
      if (typeof el === 'string') {
        const regex = new RegExp(`\\b(${name})\\b`, 'gi');
        const parts = el.split(regex);
        parts.forEach((part, i) => {
          if (part.toLowerCase() === name.toLowerCase()) {
            nextElements.push(<ConditionIcon key={`${name}-${i}`} condition={part} size={18} />);
          } else if (part) {
            nextElements.push(part);
          }
        });
      } else {
        nextElements.push(el);
      }
    });
    elements = nextElements;
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
