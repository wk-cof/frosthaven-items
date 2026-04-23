import React from 'react';
import {
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';
import { InfoSection } from './InfoSection';

interface MechanicsSectionProps {
  notes: string[];
}

export const MechanicsSection: React.FC<MechanicsSectionProps> = ({ notes }) => {
  const parseNote = (note: string) => {
    const sentences = note.split('. ');
    if (sentences.length > 1 && sentences[0].length < 60) {
      return { title: sentences[0], body: sentences.slice(1).join('. ') };
    }
    return { title: 'Class Mechanic', body: note };
  };

  return (
    <InfoSection title="Core Mechanics">
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
    </InfoSection>
  );
};
