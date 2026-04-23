import React from 'react';
import { Box, Tooltip } from '@mui/material';

type ResourceType = 
  | 'Metal' | 'Hide' | 'Wood' 
  | 'Arrowvine' | 'Axenut' | 'Corpsecap' | 'Flamefruit' | 'Rockroot' | 'Snowthistle'
  | 'Any Herb' | string;

interface ResourceIconProps {
  resource: ResourceType;
  size?: number;
  showTooltip?: boolean;
}

const RESOURCE_ICON_MAP: Record<string, string> = {
  'metal': 'fh-metal-bw-icon.png',
  'hide': 'fh-hide-bw-icon.png',
  'wood': 'fh-lumber-bw-icon.png',
  'arrowvine': 'fh-arrowvine-bw-icon.png',
  'axenut': 'fh-axenut-bw-icon.png',
  'corpsecap': 'fh-corpsecap-bw-icon.png',
  'flamefruit': 'fh-flamefruit-bw-icon.png',
  'rockroot': 'fh-rockroot-bw-icon.png',
  'snowthistle': 'fh-snowthistle-bw-icon.png',
  'any herb': 'fh-loot-bw-icon.png',
};

export const ResourceIcon: React.FC<ResourceIconProps> = ({ resource, size = 18, showTooltip = true }) => {
  const lowerRes = String(resource).toLowerCase();
  const filename = RESOURCE_ICON_MAP[lowerRes];

  if (!filename) {
    return <Box component="span" sx={{ fontWeight: 600 }}>{resource}</Box>;
  }

  const iconElement = (
    <Box
      component="img"
      src={`${import.meta.env.BASE_URL}assets/general/${filename}`}
      alt={resource}
      sx={{
        width: size,
        height: size,
        objectFit: 'contain',
        verticalAlign: 'middle',
        display: 'inline-block',
        filter: 'invert(1)', // White on transparent
        mr: 0.5
      }}
    />
  );

  if (showTooltip) {
    return (
      <Tooltip title={resource} arrow placement="top">
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          {iconElement}
        </Box>
      </Tooltip>
    );
  }

  return iconElement;
};
