import {
  Box,
  Typography,
  Container,
  Stack,
  Chip,
  Avatar,
  Paper,
  Grid
} from '@mui/material';
import { ElementIcon } from '../ElementIcon';
import { Character } from '../../types/character';

const SegmentBar = ({ value }: { value: number }) => (
  <Stack direction="row" spacing={0.5} sx={{ height: 12, width: '100%' }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Box
        key={i}
        sx={{
          flex: 1,
          borderRadius: '2px',
          bgcolor: i <= value ? '#38bdf8' : 'rgba(15, 23, 42, 0.5)',
          boxShadow: i <= value ? '0 0 8px rgba(56, 189, 248, 0.4)' : 'none',
          transition: 'all 0.3s ease',
        }}
      />
    ))}
  </Stack>
);

interface HeroSectionProps {
  character: Character;
  level: number;
  availableCards: number;
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

export const HeroSection: React.FC<HeroSectionProps> = ({ character, level, availableCards }) => {
  const currentHP = character.hp[level.toString()] || character.hp["1"];
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${character.id}`;

  const getStatDesc = (val: number) => {
    if (val >= 5) return 'Extreme';
    if (val >= 4) return 'High';
    if (val >= 3) return 'Average';
    if (val >= 2) return 'Low';
    return 'Minimal';
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(15, 23, 42, 0.9)), radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1), transparent 50%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Main Info Column */}
          <Grid {...({ size: { xs: 12, lg: 8 } } as any)}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              sx={{
                alignItems: { xs: 'center', md: 'flex-start' },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              {/* Portrait */}
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <Avatar
                  src={`${basePath}/${character.portrait}`}
                  alt={character.name}
                  sx={{
                    width: 240,
                    height: 240,
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 0 30px rgba(220, 38, 38, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)',
                    bgcolor: 'rgba(30, 41, 59, 0.7)',
                    '& img': {
                      objectPosition: 'center 20%',
                      transition: 'transform 0.5s ease',
                    },
                    '&:hover img': { transform: 'scale(1.1)' }
                  }}
                />
              </Box>

              {/* Content */}
              <Stack spacing={2.5} sx={{ flex: 1, width: '100%' }}>
                {/* Header Tags */}
                <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Chip
                    label={`${character.spoilerName}`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      color: '#38bdf8',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em'
                    }}
                  />

                  <Chip
                    label={`${character.race}`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      color: '#38bdf8',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em'
                    }}
                  />
                </Stack>

                {/* Title */}
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: 1,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0.8
                    }}
                  >
                    <img src={`${basePath}/${character.icon}`} alt="Class" style={{ width: '100%', filter: 'drop-shadow(0 0 5px #38bdf8)' }} />
                  </Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      background: 'linear-gradient(to right, #f87171, #fb923c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1
                    }}
                  >
                    {character.name}
                  </Typography>
                </Stack>

                {/* Sub-Header info */}
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Chip
                    label={
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8' }}>COMPLEXITY:</Typography>
                        <Stack direction="row" spacing={0.5}>
                          {[1, 2, 3, 4, 5].map(i => (
                            <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: i <= character.complexity ? '#38bdf8' : 'rgba(255,255,255,0.1)' }} />
                          ))}
                        </Stack>
                      </Stack>
                    }
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', px: 1, height: 'auto', py: 0.5 }}
                  />
                  <Chip
                    label={
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8' }}>AFFINITIES:</Typography>
                        <Stack direction="row" spacing={0.5}>
                          {character.elements.map(el => <ElementIcon key={el} element={el} size={20} />)}
                        </Stack>
                      </Stack>
                    }
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', px: 1, height: 'auto', py: 0.5 }}
                  />
                </Stack>

                {/* Traits */}
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {character.traits.map(t => (
                    <Chip
                      key={t}
                      label={t}
                      sx={{
                        bgcolor: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        color: '#38bdf8',
                        borderRadius: 2
                      }}
                    />
                  ))}
                </Stack>

                {/* Base Stats */}
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {[
                    { label: 'Hand Size', value: character.handSize },
                    { label: `HP (Lvl ${level})`, value: currentHP },
                    { label: 'Cards', value: availableCards }
                  ].map(stat => (
                    <Box
                      key={stat.label}
                      sx={{
                        bgcolor: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        p: '10px 16px',
                        minWidth: 90,
                        textAlign: 'center'
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1.2 }}>{stat.value}</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.65rem' }}>{stat.label}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          {/* Combat Profile Sidebar Column */}
          <Grid {...({ size: { xs: 12, lg: 4 } } as any)}>
            <Paper elevation={0} sx={{ ...glassStyle, height: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  pb: 1
                }}
              >
                Combat Profile
              </Typography>
              <Stack spacing={2}>
                {Object.entries(character.roleStats).map(([label, val]) => (
                  <Box key={label}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography sx={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', fontWeight: 600, color: '#38bdf8' }}>
                        {getStatDesc(val)}
                      </Typography>
                    </Stack>
                    <SegmentBar value={val} />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
