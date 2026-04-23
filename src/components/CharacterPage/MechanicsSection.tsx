import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Grid
} from '@mui/material';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';

interface MechanicsSectionProps {
  notes: string[];
}

export const MechanicsSection: React.FC<MechanicsSectionProps> = ({ notes }) => {
  const getIcon = (index: number) => {
    const icons = ['coronavirus', 'bolt', 'bloodtype', 'shield'];
    return icons[index % icons.length];
  };

  const getColor = (index: number) => {
    const colors = ['#dc2626', '#38bdf8', '#fbbf24', '#a855f7'];
    return colors[index % colors.length];
  };

  const parseNote = (note: string) => {
    const sentences = note.split('. ');
    if (sentences.length > 1 && sentences[0].length < 60) {
      return { title: sentences[0], body: sentences.slice(1).join('. ') };
    }
    return { title: 'Class Mechanic', body: note };
  };

  return (
    <Box component="section" sx={{ width: '100%', py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: '2rem', 
            fontWeight: 800, 
            color: '#f8fafc', 
            mb: 4,
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
          Core Mechanics
        </Typography>

        <Grid container spacing={4}>
          {notes.map((note, i) => {
            const { title, body } = parseNote(note);
            const color = getColor(i);
            return (
              <Grid key={i} size={{ xs: 12, md: 6 }}>
                <Box 
                  className="mechanics-card"
                  sx={{
                    background: 'rgba(22, 28, 45, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    p: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '&:hover': {
                      borderColor: `${color}80`,
                      transform: 'translateY(-2px)',
                      background: 'rgba(30, 41, 59, 0.8)',
                    },
                    /* Glow effect using sx pseudo-element */
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '100px',
                      height: '100px',
                      background: color,
                      opacity: 0.05,
                      filter: 'blur(40px)',
                      borderRadius: '50%',
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 0.15,
                    }
                  }}
                >
                  <Stack direction="row" spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: color,
                      }}
                    >
                      <span className="material-symbols-outlined">{getIcon(i)}</span>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', mb: 0.5 }}
                      >
                        {title}
                      </Typography>
                      <Box sx={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#94a3b8' }}>
                        {renderTextWithTooltips(body, glossaryData)}
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
