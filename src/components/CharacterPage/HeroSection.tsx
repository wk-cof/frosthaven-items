import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Stack,
  Chip,
  Avatar,
  Paper,
  Grid,
  Slider,
  Fade
} from '@mui/material';
import { ElementIcon } from '../ElementIcon';
import { Character } from '../../types/character';

const SegmentBar = ({ value, color }: { value: number, color: string }) => (
  <Stack direction="row" spacing={0.5} sx={{ height: 12, width: '100%' }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Box
        key={i}
        sx={{
          flex: 1,
          borderRadius: '2px',
          bgcolor: i <= value ? color : 'rgba(15, 23, 42, 0.5)',
          boxShadow: i <= value ? `0 0 8px ${color}66` : 'none', // 66 is ~40% opacity in hex
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
  onLevelChange: (level: number) => void;
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

const CompactStat = ({ label, value, color }: { label: string, value: number | string, color: string }) => (
  <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', bgcolor: 'rgba(0,0,0,0.3)', px: 1.5, py: 0.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
    <Typography sx={{ color: color, fontWeight: 800, fontSize: '0.9rem' }}>{value}</Typography>
    <Typography sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</Typography>
  </Stack>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  character,
  level,
  availableCards,
  onLevelChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const currentHP = character.hp[level.toString()] || character.hp["1"];
  const basePath = `${import.meta.env.BASE_URL}assets/characters/${character.id}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatDesc = (val: number) => {
    if (val >= 5) return 'Extreme';
    if (val >= 4) return 'High';
    if (val >= 3) return 'Average';
    if (val >= 2) return 'Low';
    return 'Minimal';
  };

  return (
    <>
      <Fade in={isScrolled}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            bgcolor: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            py: 1,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <Container maxWidth="lg">
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar
                  src={`${basePath}/${character.portrait}`}
                  sx={{
                    width: 44,
                    height: 44,
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: `0 0 10px ${character.theme.glow}`
                  }}
                />
                <Stack>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', background: `linear-gradient(to right, ${character.theme.primary}, ${character.theme.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
                    {character.spoilerName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.6rem' }}>
                    {character.race} • LVL {level}
                  </Typography>
                </Stack>
              </Stack>

              <Box sx={{ flex: 1, maxWidth: 300, px: 2 }}>
                <Slider
                  min={1}
                  max={9}
                  step={1}
                  value={level}
                  onChange={(_, val) => onLevelChange(val as number)}
                  sx={{
                    height: 4,
                    color: character.theme.primary,
                    py: 1,
                    '& .MuiSlider-track': { border: 'none' },
                    '& .MuiSlider-rail': { opacity: 0.1, bgcolor: '#ffffff' },
                    '& .MuiSlider-thumb': {
                      width: 14,
                      height: 14,
                      bgcolor: character.theme.primary,
                      '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: `0 0 10px ${character.theme.glow}`,
                      },
                      '&::before': { display: 'none' },
                    },
                  }}
                />
              </Box>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <CompactStat label="Hand" value={character.handSize} color={character.theme.primary} />
                <CompactStat label="HP" value={currentHP} color={character.theme.primary} />
                <CompactStat label="Cards" value={availableCards} color={character.theme.primary} />
              </Stack>

              <Stack direction="row" spacing={1}>
                {character.elements.map(el => <ElementIcon key={el} element={el} size={24} />)}
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Fade>

      <Box
        sx={{
          background: `${character.theme.headerGradient}, radial-gradient(circle at 20% 80%, ${character.theme.glow}, transparent 50%)`,
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
                      boxShadow: `0 0 30px ${character.theme.glow}, inset 0 0 20px rgba(0, 0, 0, 0.5)`,
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
                        bgcolor: `${character.theme.primary}1A`, // 1A is ~10% opacity
                        border: `1px solid ${character.theme.primary}33`, // 33 is ~20% opacity
                        color: character.theme.primary,
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        letterSpacing: '0.05em'
                      }}
                    />

                    <Chip
                      label={`${character.race}`}
                      size="small"
                      sx={{
                        bgcolor: `${character.theme.primary}1A`,
                        border: `1px solid ${character.theme.primary}33`,
                        color: character.theme.primary,
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
                      <img src={`${basePath}/${character.icon}`} alt="Class" style={{ width: '100%', filter: `drop-shadow(0 0 5px ${character.theme.primary})` }} />
                    </Box>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        background: `linear-gradient(to right, ${character.theme.primary}, ${character.theme.secondary})`,
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
                              <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: i <= character.complexity ? character.theme.primary : 'rgba(255,255,255,0.1)' }} />
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
                          bgcolor: `${character.theme.primary}1A`,
                          border: `1px solid ${character.theme.primary}33`,
                          color: character.theme.primary,
                          borderRadius: 2
                        }}
                      />
                    ))}
                  </Stack>

                  {/* Base Stats */}
                  <Stack spacing={3} sx={{ width: '100%', pt: 1 }}>
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
                          <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: character.theme.primary, lineHeight: 1.2 }}>{stat.value}</Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.65rem' }}>{stat.label}</Typography>
                        </Box>
                      ))}
                    </Stack>

                    {/* Character Progression Slider */}
                    <Box sx={{ maxWidth: 400, width: '100%', px: 1 }}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Progression
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: character.theme.primary }}>
                          LEVEL {level}
                        </Typography>
                      </Stack>
                      <Slider
                        min={1}
                        max={9}
                        step={1}
                        value={level}
                        onChange={(_, val) => onLevelChange(val as number)}
                        sx={{
                          height: 4,
                          color: character.theme.primary,
                          py: 1,
                          '& .MuiSlider-track': { border: 'none' },
                          '& .MuiSlider-rail': { opacity: 0.1, bgcolor: '#ffffff' },
                          '& .MuiSlider-thumb': {
                            width: 16,
                            height: 16,
                            bgcolor: character.theme.primary,
                            border: '3px solid #0f172a',
                            boxShadow: `0 0 10px ${character.theme.glow}`,
                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                              boxShadow: `0 0 15px ${character.theme.glow}`,
                            },
                            '&::before': { display: 'none' },
                          },
                        }}
                      />
                      <Stack direction="row" sx={{ justifyContent: 'space-between', px: 0.5 }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => (
                          <Typography
                            key={lvl}
                            sx={{
                              color: lvl === level ? character.theme.primary : 'rgba(255,255,255,0.2)',
                              fontSize: '0.65rem',
                              fontWeight: 700
                            }}
                          >
                            {lvl}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
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
                        <Typography sx={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', fontWeight: 600, color: character.theme.primary }}>
                          {getStatDesc(val)}
                        </Typography>
                      </Stack>
                      <SegmentBar value={val} color={character.theme.primary} />
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
