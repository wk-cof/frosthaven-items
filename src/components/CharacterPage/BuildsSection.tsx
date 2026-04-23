import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BuildArchetype } from '../../types/character';

interface BuildsSectionProps {
  builds: BuildArchetype[];
}

export const BuildsSection: React.FC<BuildsSectionProps> = ({ builds }) => {
  const [expandedId, setExpandedId] = useState<string | null>(builds[0]?.id || null);

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
          Strategic Builds
        </Typography>

        <Stack spacing={3}>
          {builds.map(build => (
            <Accordion 
              key={build.id}
              expanded={expandedId === build.id}
              onChange={() => setExpandedId(expandedId === build.id ? null : build.id)}
              sx={{
                bgcolor: 'rgba(30, 41, 59, 0.4)',
                backgroundImage: 'none',
                borderRadius: '16px !important',
                border: '1px solid',
                borderColor: expandedId === build.id ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                color: '#f8fafc',
                transition: 'all 0.3s ease',
                boxShadow: expandedId === build.id ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : 'none',
                '&::before': { display: 'none' },
                '&:hover': {
                  borderColor: 'rgba(56, 189, 248, 0.3)'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#475569' }} />}
                sx={{
                  p: 3,
                  '& .MuiAccordionSummary-content': { m: 0 },
                  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                    transform: 'rotate(180deg)'
                  }
                }}
              >
                <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))' }}>
                    {build.icon}
                  </Typography>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5 }}>
                      {build.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {build.summary}
                    </Typography>
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, px: 3, pb: 3 }}>
                <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', pt: 3 }}>
                  <Grid container spacing={4}>
                    <Grid {...({ size: { xs: 12, md: 6 } } as any)}>
                      <Stack spacing={4}>
                        <Box>
                          <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.1em', mb: 1, display: 'block' }}>
                            Philosophy
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                            {build.strategy}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.1em', mb: 1.5, display: 'block' }}>
                            Core Cards
                          </Typography>
                          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                            {build.keyCards.map(c => (
                              <Chip 
                                key={c} 
                                label={c} 
                                size="small"
                                sx={{ 
                                  bgcolor: 'rgba(56, 189, 248, 0.1)', 
                                  color: '#7dd3fc',
                                  fontWeight: 600,
                                  border: '1px solid rgba(56, 189, 248, 0.2)',
                                  borderRadius: 1.5
                                }} 
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid {...({ size: { xs: 12, md: 6 } } as any)}>
                      <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.1em', mb: 1.5, display: 'block' }}>
                        Progression Path
                      </Typography>
                      <Stack spacing={1}>
                        {Object.entries(build.levelPicks).sort().map(([lvl, pick]) => (
                            <Stack 
                            key={lvl} 
                            direction="row" 
                            spacing={2} 
                            sx={{ alignItems: 'center', bgcolor: 'rgba(0, 0, 0, 0.2)', p: 1, px: 2, borderRadius: 2 }}
                          >
                            <Chip 
                              label={`LVL ${lvl}`} 
                              size="small"
                              sx={{ 
                                bgcolor: 'rgba(56, 189, 248, 0.1)', 
                                color: '#38bdf8',
                                fontWeight: 800,
                                fontSize: '0.7rem',
                                borderRadius: 1
                              }} 
                            />
                            <Typography sx={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>
                              {pick}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
