import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';

interface MechanicsSectionProps {
  notes: string[];
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

export const MechanicsSection: React.FC<MechanicsSectionProps> = ({ notes }) => {
  const parseNote = (note: string) => {
    const sentences = note.split('. ');
    if (sentences.length > 1 && sentences[0].length < 60) {
      return { title: sentences[0], body: sentences.slice(1).join('. ') };
    }
    return { title: 'Class Mechanic', body: note };
  };

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
        Core Mechanics
      </Typography>

      <Paper elevation={0} sx={{ ...glassStyle, minHeight: 400 }}>
        <Stack spacing={3}>
          {notes.map((note, i) => {
            const { title, body } = parseNote(note);
            return (
              <Box key={i}>
                <Typography
                  variant="h6"
                  sx={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 700, 
                    color: '#f8fafc', 
                    mb: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  {title}
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#94a3b8', 
                    fontSize: '1rem', 
                    lineHeight: 1.7 
                  }}
                >
                  {renderTextWithTooltips(body, glossaryData)}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Paper>
    </Box>
  );
};
