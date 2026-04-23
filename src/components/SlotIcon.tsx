import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { toTitleCase } from '../utils/stringUtils';

type SlotType = 'head' | 'body' | 'legs' | '1h' | '2h' | 'small' | string;

interface SlotIconProps {
  slot: SlotType;
  size?: number;
  showTooltip?: boolean;
}

const SLOT_ICON_MAP: Record<string, string> = {
  'head': 'fh-equip-slot-head-bw-icon.png',
  'body': 'fh-equip-slot-body-bw-icon.png',
  'legs': 'fh-equip-slot-legs-bw-icon.png',
  '1h': 'fh-equip-slot-single-hand-bw-icon.png',
  '2h': 'fh-equip-slot-dual-hand-bw-icon.png',
  'small': 'fh-equip-slot-item-bw-icon.png',
};

const SLOT_LABEL_MAP: Record<string, string> = {
  'head': 'Head',
  'body': 'Body',
  'legs': 'Legs',
  '1h': 'One Hand',
  '2h': 'Two Hands',
  'small': 'Small Item',
};

export const SlotIcon: React.FC<SlotIconProps> = ({ slot, size = 20, showTooltip = true }) => {
  const lowerSlot = String(slot).toLowerCase();
  const filename = SLOT_ICON_MAP[lowerSlot];
  const label = SLOT_LABEL_MAP[lowerSlot] || toTitleCase(slot);

  if (!filename) {
    return <Box component="span" sx={{ fontSize: '0.8rem', color: '#94a3b8' }}>{label}</Box>;
  }

  const iconElement = (
    <Box
      component="img"
      src={`${import.meta.env.BASE_URL}assets/general/${filename}`}
      alt={label}
      sx={{
        width: size,
        height: size,
        verticalAlign: 'middle',
        display: 'inline-block',
        filter: 'invert(0.8) brightness(1.2)', // Light gray on transparent
        opacity: 0.9
      }}
    />
  );

  if (showTooltip) {
    return (
      <Tooltip title={label} arrow placement="top">
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          {iconElement}
        </Box>
      </Tooltip>
    );
  }

  return iconElement;
};
