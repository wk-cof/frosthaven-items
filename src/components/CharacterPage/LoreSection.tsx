import React from 'react';
import { 
  Typography, 
  Stack 
} from '@mui/material';
import { renderTextWithTooltips } from '../RuleTooltip';
import glossaryData from '../../data/glossary.json';
import { InfoSection } from './InfoSection';

import { CharacterTheme } from '../../types/character';

interface LoreSectionProps {
  lore: string;
  race: string;
  matBack: string;
  basePath: string;
  theme: CharacterTheme;
}

export const LoreSection: React.FC<LoreSectionProps> = ({ lore, race, matBack, basePath, theme }) => {
  return (
    <InfoSection 
      title="Class Lore" 
      backgroundImage={`${basePath}/${matBack}`}
      theme={theme}
    >
      <Typography
        sx={{
          fontFamily: 'Space Grotesk',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: theme.primary,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          mb: 2,
        }}
      >
        The {race}
      </Typography>
      <Stack spacing={2}>
        {lore.split('\n\n').map((para, i) => (
          <Typography key={i} sx={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 }}>
            {renderTextWithTooltips(para, glossaryData)}
          </Typography>
        ))}
      </Stack>
    </InfoSection>
  );
};
