import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  List,
  ListItem
} from '@mui/material';
import { PerkPriority, CharacterTheme } from '../../types/character';

interface PerkPriorityListProps {
  perks: PerkPriority[];
  theme: CharacterTheme;
}

export const PerkPriorityList: React.FC<PerkPriorityListProps> = ({ perks, theme }) => {
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
          Perk Investment Priority
        </Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {perks.map((p, i) => (
            <ListItem 
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                background: 'rgba(30, 41, 59, 0.4)',
                padding: '16px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(30, 41, 59, 0.6)',
                  borderColor: `${theme.primary}33`,
                  transform: 'translateX(4px)',
                }
              }}
            >
              <Typography 
                sx={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 900, 
                  color: theme.primary, 
                  opacity: 0.5, 
                  minWidth: 40 
                }}
              >
                #{i + 1}
              </Typography>
              <Box>
                <Typography sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1rem' }}>
                  {p.perk}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  {p.note}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};
