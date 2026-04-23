import React from 'react';

type GeneralIconType = 
  | 'ATTACK' | 'DAMAGE' | 'HEAL' | 'SHIELD' | 'MOVE' | 'JUMP' 
  | 'TARGET' | 'RANGE' | 'RETALIATE' | 'XP' | 'LOOT' | 'MONEY'
  | string;

interface GeneralIconProps {
  icon: GeneralIconType;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<string, string> = {
  'ATTACK': 'fh-attack-bw-icon.png',
  'DAMAGE': 'fh-damage-bw-icon.png',
  'HEAL': 'fh-heal-bw-icon.png',
  'SHIELD': 'fh-shield-bw-icon.png',
  'MOVE': 'fh-move-bw-icon.png',
  'JUMP': 'fh-jump-bw-icon.png',
  'TARGET': 'fh-target-bw-icon.png',
  'RANGE': 'fh-range-bw-icon.png',
  'RETALIATE': 'fh-retaliate-bw-icon.png',
  'XP': 'fh-xp-bw-icon.png',
  'LOOT': 'fh-loot-bw-icon.png',
  'MONEY': 'fh-money-bw-icon.png',
  'FIRE': 'fh-fire-bw-icon.png',
  'AIR': 'fh-air-bw-icon.png',
  'EARTH': 'fh-earth-bw-icon.png',
  'ICE': 'fh-ice-bw-icon.png',
  'LIGHT': 'fh-light-bw-icon.png',
  'DARK': 'fh-dark-bw-icon.png',
  'DISARM': 'fh-disarm-bw-icon.png',
  'WARD': 'fh-ward-bw-icon.png'
};

export const GeneralIcon: React.FC<GeneralIconProps> = ({ icon, size = 18, className = "" }) => {
  const upperIcon = icon.toUpperCase().replace(/[<>]/g, '');
  const filename = ICON_MAP[upperIcon];

  if (!filename) {
    return <span className={className}>{icon}</span>;
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/general/${filename}`}
      alt={icon}
      title={icon}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        verticalAlign: 'middle',
        display: 'inline-block',
        filter: 'invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.2))' // BW icons usually black, need to invert for dark theme
      }}
      className={`general-icon ${className}`}
    />
  );
};
