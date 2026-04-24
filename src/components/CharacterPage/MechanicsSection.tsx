import React from 'react';
import {
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';
import { InfoSection } from './InfoSection';

import { CharacterTheme } from '../../types/character';

interface MechanicsSectionProps {
  notes: string[];
  theme: CharacterTheme;
}

export const MechanicsSection: React.FC<MechanicsSectionProps> = ({ notes, theme }) => {
  const parseNote = (note: string) => {
    const sentences = note.split('. ');
    if (sentences.length > 1 && sentences[0].length < 60) {
      return { title: sentences[0], body: sentences.slice(1).join('. ') };
    }
    return { title: 'Class Mechanic', body: note };
  };

  return (
    <InfoSection title="Core Mechanics" theme={theme}>
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
                  color: theme.secondary, 
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  '&::before': {
                    content: '""',
                    width: '4px',
                    height: '20px',
                    bgcolor: theme.primary,
                    borderRadius: '2px'
                  }
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
