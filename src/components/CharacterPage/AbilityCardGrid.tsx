import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Grid,
  Card,
  CardMedia,
  Chip
} from '@mui/material';
import { CharacterCard } from '../../types/character';

interface AbilityCardGridProps {
  cards: CharacterCard[];
  characterId: string;
  level: number;
  onCardClick: (img: string) => void;
}

export const AbilityCardGrid: React.FC<AbilityCardGridProps> = ({ cards, characterId, level, onCardClick }) => {
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${characterId}`;
  
  const getLevelColor = (lvl: string) => {
    switch(lvl.toLowerCase()) {
      case 'x': return { bg: 'rgba(139, 92, 246, 0.2)', text: '#c4b5fd' };
      case '1': return { bg: 'rgba(56, 189, 248, 0.15)', text: '#7dd3fc' };
      case '9': return { bg: 'rgba(220, 38, 38, 0.2)', text: '#fca5a5' };
      default: return { bg: 'rgba(34, 197, 94, 0.15)', text: '#86efac' };
    }
  };

  return (
    <Box component="section" sx={{ width: '100%', py: 6 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: '#f8fafc', 
            mb: 3,
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
          Ability Cards
        </Typography>

        <Box sx={{ mb: 3, textAlign: 'right' }}>
          <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>
            Showing {cards.length} cards available at Level {level}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {cards.map(card => {
            const colors = getLevelColor(card.level);
            return (
              <Grid key={card.name} {...({ size: { xs: 6, sm: 4, md: 3, lg: 2.4 } } as any)}>
                <Card 
                  sx={{ 
                    bgcolor: 'rgba(30, 41, 59, 0.4)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      borderColor: '#38bdf8',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.2)',
                    }
                  }}
                >
                  <Box>
                    <CardMedia
                      component="img"
                      image={`${basePath}/ability-cards/${card.image}`}
                      alt={card.name}
                      onClick={() => onCardClick(card.image)}
                      sx={{ aspectRatios: '2/3', objectFit: 'cover', cursor: 'zoom-in' }}
                      loading="lazy"
                    />
                    <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.3)' }}>
                      <Typography 
                        sx={{ 
                          fontWeight: 700, 
                          color: '#f8fafc', 
                          fontSize: '0.9rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          mb: 1
                        }}
                      >
                        {card.name}
                      </Typography>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label={`LVL ${card.level.toUpperCase()}`}
                          size="small"
                          sx={{ 
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            bgcolor: colors.bg,
                            color: colors.text,
                            border: '1px solid rgba(255,255,255,0.1)',
                            '& .MuiChip-label': { px: 1 }
                          }}
                        />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>
                          INIT {card.initiative}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
