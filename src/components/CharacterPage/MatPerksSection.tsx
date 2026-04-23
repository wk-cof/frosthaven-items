import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Grid,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

interface MatPerksSectionProps {
  matFront: string;
  matBack: string;
  perks: string;
  characterId: string;
  onImageClick: (img: string) => void;
  matSide: 'front' | 'back';
  onSideChange: (side: 'front' | 'back') => void;
}

const ImageWrapperStyle = {
  background: 'rgba(30, 41, 59, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  p: 3,
  cursor: 'zoom-in',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(56, 189, 248, 0.4)',
    boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)',
  },
  '& img': {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
  }
};

export const MatPerksSection: React.FC<MatPerksSectionProps> = ({ 
  matFront, matBack, perks, characterId, onImageClick, matSide, onSideChange 
}) => {
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${characterId}`;
  const currentMat = matSide === 'front' ? matFront : matBack;

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
          Character Mat & Perks
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <ToggleButtonGroup
                value={matSide}
                exclusive
                onChange={(_, val) => val && onSideChange(val)}
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.3)',
                  p: 0.5,
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '& .MuiToggleButton-root': {
                    px: 3,
                    py: 1,
                    borderRadius: '7px !important',
                    border: 'none',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    '&.Mui-selected': {
                      bgcolor: '#38bdf8',
                      color: '#0f172a',
                      '&:hover': { bgcolor: '#38bdf8' }
                    }
                  }
                }}
              >
                <ToggleButton value="front">Front</ToggleButton>
                <ToggleButton value="back">Back</ToggleButton>
              </ToggleButtonGroup>

              <Box sx={ImageWrapperStyle} onClick={() => onImageClick(currentMat)}>
                <img src={`${basePath}/${currentMat}`} alt={`Mat ${matSide}`} />
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ mt: { md: 9 } }}>
              <Box sx={ImageWrapperStyle} onClick={() => onImageClick(perks)}>
                <img src={`${basePath}/${perks}`} alt="Perk Sheet" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
