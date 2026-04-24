import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';

import { CharacterTheme } from '../../types/character';

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  backgroundImage?: string;
  minHeight?: number | string;
  theme?: CharacterTheme;
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

export const InfoSection: React.FC<InfoSectionProps> = ({ 
  title, 
  children, 
  backgroundImage, 
  minHeight = 400,
  theme
}) => {
  return (
    <Box component="section" sx={{ width: '100%', height: '100%' }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: '#f8fafc',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          '&::after': {
            content: '""',
            flex: 1,
            height: '1px',
            background: theme ? `linear-gradient(to right, ${theme.primary}66, transparent)` : 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent)',
          }
        }}
      >
        {title}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          ...glassStyle,
          height: 'calc(100% - 60px)', // Adjust for heading height
          minHeight,
          position: 'relative',
          overflow: 'hidden',
          borderColor: theme ? `${theme.primary}4D` : 'rgba(255, 255, 255, 0.1)',
          '&::before': backgroundImage ? {
            content: "''",
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          } : undefined
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
};
