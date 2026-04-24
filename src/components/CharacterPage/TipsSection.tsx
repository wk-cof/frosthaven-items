import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid
} from '@mui/material';
import { CharacterTip, CharacterTheme } from '../../types/character';

interface TipsSectionProps {
  tips: CharacterTip[];
  theme: CharacterTheme;
}

export const TipsSection: React.FC<TipsSectionProps> = ({ tips, theme }) => {
  return (
    <Box component="section" sx={{ width: '100%', py: 6 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: '#f8fafc', 
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&::after': {
              content: '""',
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent)',
              ml: 2
            }
          }}
        >
          Expert Advice
        </Typography>

        <Grid container spacing={3}>
          {tips.map((tip, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box 
                sx={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: 3,
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    background: 'rgba(30, 41, 59, 0.6)',
                    transform: 'scale(1.02)',
                    borderColor: `${theme.primary}4D`,
                  }
                }}
              >
                <Typography sx={{ fontSize: '2rem' }}>{tip.icon}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                  {tip.title}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#94a3b8' }}>
                  {tip.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
