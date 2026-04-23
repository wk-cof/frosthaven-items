import React from 'react';
import { Box } from '@mui/material';

type ModifierType = '2x' | '+0' | '+1' | '+2' | '+3' | '+4' | '-1' | '-2' | string;

interface ModifierIconProps {
  modifier: ModifierType;
  size?: number;
}

const MODIFIER_MAP: Record<string, string> = {
  '2x': 'fh-2x-bw-icon.png',
  '+0': 'fh-plus-0-bw-icon.png',
  '+1': 'fh-plus-1-bw-icon.png',
  '+2': 'fh-plus-2-bw-icon.png',
  '+3': 'fh-plus-3-bw-icon.png',
  '+4': 'fh-plus-4-bw-icon.png',
  '-1': 'fh-minus-1-bw-icon.png',
  '-2': 'fh-minus-2-bw-icon.png',
};

const getModifierColor = (mod: string) => {
  if (mod === '2x') return '#fbbf24'; // Gold
  if (mod.startsWith('+')) {
    if (mod === '+0') return '#94a3b8'; // gray
    return '#4ade80'; // green
  }
  if (mod.startsWith('-')) return '#fc1919ff'; // red
  return '#f8fafc';
};

export const ModifierIcon: React.FC<ModifierIconProps> = ({ modifier, size = 20 }) => {
  const filename = MODIFIER_MAP[modifier];

  if (!filename) {
    return (
      <Box
        component="span"
        sx={{
          color: getModifierColor(modifier),
          fontWeight: 800,
          fontSize: `${size * 0.8}px`
        }}
      >
        {modifier}
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={`${import.meta.env.BASE_URL}assets/modifiers/${filename}`}
      alt={modifier}
      title={modifier}
      sx={{
        width: size,
        height: size,
        objectFit: 'contain',
        verticalAlign: 'middle',
        display: 'inline-block',
        filter: `${modifier === '+0' ? 'invert(0.6)' : 'invert(1)'} drop-shadow(0 0 2px ${getModifierColor(modifier)})`
      }}
    />
  );
};
