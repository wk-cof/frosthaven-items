import React from 'react';

type GeneralIconType = 
  | 'ATTACK' | 'DAMAGE' | 'HEAL' | 'SHIELD' | 'MOVE' | 'JUMP' 
  | 'TARGET' | 'RANGE' | 'RETALIATE' | 'XP' | 'LOOT' | 'MONEY'
  | 'WARD' | 'DISARM' | string;

interface GeneralIconProps {
  icon: GeneralIconType;
  size?: number;
  className?: string;
  glossary?: any;
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
  'WARD': 'fh-ward-bw-icon.png',
  'DISARM': 'fh-disarm-bw-icon.png'
};

export const GeneralIcon: React.FC<GeneralIconProps> = ({ icon, size = 18, className = "", glossary }) => {
  const upperIcon = String(icon).toUpperCase().replace(/[<>]/g, '');
  const filename = ICON_MAP[upperIcon];
  
  // Try to find matching term for tooltip
  const termName = upperIcon.charAt(0) + upperIcon.slice(1).toLowerCase();
  const elementIcons = ['FIRE', 'AIR', 'EARTH', 'ICE', 'LIGHT', 'DARK', 'WILD', 'CONSUME'];
  const conditionIcons = [
    'POISON', 'WOUND', 'MUDDLE', 'IMMOBILIZE', 'DISARM', 
    'STUN', 'INVISIBLE', 'STRENGTHEN', 'BLESS', 'CURSE',
    'WARD', 'BRITTLE', 'BANE', 'IMPAIR', 'REGENERATE'
  ];

  let folder = 'general';
  if (elementIcons.includes(upperIcon)) folder = 'elements';
  else if (conditionIcons.includes(upperIcon)) folder = 'conditions';

  const iconElement = filename ? (
    <img
      src={`${import.meta.env.BASE_URL}assets/${folder}/${filename}`}
      alt={icon}
      title={icon}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        verticalAlign: 'middle',
        display: 'inline-block',
        filter: 'invert(1)' // White on transparent (removes white background when inverted against dark theme)
      }}
      className={`general-icon ${className}`}
    />
  ) : (
    <span className={className}>{icon}</span>
  );

  if (glossary && glossary[termName]) {
    return (
      <span className="tooltip-container">
        {iconElement}
        <span className="tooltip-content">
          <span className="tooltip-title">{termName}</span>
          {glossary[termName]}
        </span>
      </span>
    );
  }

  return iconElement;
};
