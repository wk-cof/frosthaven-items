import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Slider
} from '@mui/material';

interface LevelSliderProps {
  level: number;
  onChange: (val: number) => void;
}

export const LevelSlider: React.FC<LevelSliderProps> = ({ level, onChange }) => {
  return (
    <Box component="section" sx={{ width: '100%', py: 6 }}>
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            background: 'rgba(30, 41, 59, 0.4)', 
            p: 4, 
            borderRadius: '16px', 
            border: '1px solid rgba(255, 255, 255, 0.1)' 
          }}
        >
          <Stack 
            direction="row" 
            sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc' }}>
              Character Progression
            </Typography>
            <Stack sx={{ alignItems: 'flex-end' }}>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.1em' }}>
                Current Level
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>
                {level}
              </Typography>
            </Stack>
          </Stack>

          <Slider
            min={1}
            max={9}
            step={1}
            value={level}
            onChange={(_, val) => onChange(val as number)}
            sx={{
              height: 6,
              color: '#38bdf8',
              '& .MuiSlider-track': { border: 'none' },
              '& .MuiSlider-rail': { opacity: 0.1, bgcolor: '#ffffff' },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                bgcolor: '#38bdf8',
                border: '4px solid #0f172a',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.6)',
                  transform: 'scale(1.1) translate(-50%, -50%)',
                },
                '&::before': { display: 'none' },
              },
            }}
          />

          <Stack direction="row" sx={{ justifyContent: 'space-between', mt: 1, px: 1 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => (
              <Typography 
                key={lvl} 
                sx={{ 
                  color: lvl <= level ? '#38bdf8' : '#475569', 
                  fontSize: '0.85rem', 
                  fontWeight: 700,
                  transition: 'color 0.2s ease'
                }}
              >
                {lvl}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
