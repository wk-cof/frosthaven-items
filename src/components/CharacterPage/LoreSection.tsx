import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack 
} from '@mui/material';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';

interface LoreSectionProps {
  lore: string;
  race: string;
  matBack: string;
  basePath: string;
}

const glassStyle = {
  backgroundColor: 'rgba(30, 41, 59, 0.7)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '12px',
  p: 3,
};

export const LoreSection: React.FC<LoreSectionProps> = ({ lore, race, matBack, basePath }) => {
  return (
    <Box component="section" sx={{ width: '100%' }}>
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: '1.5rem', 
          fontWeight: 800, 
          color: '#f8fafc', 
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          '&::after': {
            content: '""',
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent)',
          }
        }}
      >
        Class Lore
      </Typography>

      <Paper
        elevation={0}
        sx={{
          ...glassStyle,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 400,
          '&::before': {
            content: "''",
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${basePath}/${matBack})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 0.5, position: 'relative', zIndex: 1 }}>Lore</Typography>
        <Typography
          sx={{
            fontFamily: 'Space Grotesk',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            mb: 2,
            position: 'relative',
            zIndex: 1
          }}
        >
          The {race}
        </Typography>
        <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          {lore.split('\n\n').map((para, i) => (
            <Typography key={i} sx={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>
              {renderTextWithTooltips(para, glossaryData)}
            </Typography>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};
