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
  // Mechanics
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
  'PUSH': 'fh-push-bw-icon.png',
  'PULL': 'fh-pull-bw-icon.png',
  'PIERCE': 'fh-pierce-bw-icon.png',
  'ACTIVE': 'fh-persistent-bonus-color-icon.png',
  'SMALL_ITEM': 'fh-equip-slot-item-bw-icon.png',
  'RECOVER': 'fh-recover-card-color-icon.png',
  'TELEPORT': 'fh-teleport-bw-icon.png',
  'TIDE': 'fh-tide-bw-icon.png',

  // Elements
  'FIRE': 'fh-fire-bw-icon.png',
  'AIR': 'fh-air-bw-icon.png',
  'EARTH': 'fh-earth-bw-icon.png',
  'ICE': 'fh-ice-bw-icon.png',
  'LIGHT': 'fh-light-bw-icon.png',
  'DARK': 'fh-dark-bw-icon.png',
  'WILD': 'fh-wild-bw-icon.png',
  'CONSUME': 'fh-consume-bw-icon.png',

  // Conditions
  'POISON': 'fh-poison-bw-icon.png',
  'WOUND': 'fh-wound-bw-icon.png',
  'MUDDLE': 'fh-muddle-bw-icon.png',
  'IMMOBILIZE': 'fh-immobilize-bw-icon.png',
  'DISARM': 'fh-disarm-bw-icon.png',
  'STUN': 'fh-stun-bw-icon.png',
  'INVISIBLE': 'fh-invisible-bw-icon.png',
  'STRENGTHEN': 'fh-strengthen-bw-icon.png',
  'BLESS': 'fh-bless-bw-icon.png',
  'CURSE': 'fh-curse-bw-icon.png',
  'WARD': 'fh-ward-bw-icon.png',
  'BRITTLE': 'fh-brittle-bw-icon.png',
  'BANE': 'fh-bane-bw-icon.png',
  'IMPAIR': 'fh-impair-bw-icon.png',
  'REGENERATE': 'fh-regenerate-bw-icon.png',

  // Resources
  'METAL': 'fh-metal-bw-icon.png',
  'HIDE': 'fh-hide-bw-icon.png',
  'LUMBER': 'fh-lumber-bw-icon.png',
  'ARROWVINE': 'fh-arrowvine-bw-icon.png',
  'AXENUT': 'fh-axenut-bw-icon.png',
  'CORPSECAP': 'fh-corpsecap-bw-icon.png',
  'FLAMEFRUIT': 'fh-flamefruit-bw-icon.png',
  'ROCKROOT': 'fh-rockroot-bw-icon.png',
  'SNOWTHISTLE': 'fh-snowthistle-bw-icon.png',

  // Modifiers
  '2X': 'fh-2x-bw-icon.png',
  'MISS': 'fh-null-bw-icon.png', // I don't see null in the list, but I saw MISS in previous session summary.
  'PLUS_0': 'fh-plus-0-bw-icon.png',
  'PLUS_1': 'fh-plus-1-bw-icon.png',
  'PLUS_2': 'fh-plus-2-bw-icon.png',
  'PLUS_3': 'fh-plus-3-bw-icon.png',
  'PLUS_4': 'fh-plus-4-bw-icon.png',
  'MINUS_1': 'fh-minus-1-bw-icon.png',
  'MINUS_2': 'fh-minus-2-bw-icon.png'
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
    'WARD', 'BRITTLE', 'BANE', 'IMPAIR', 'REGENERATE',
    'PUSH', 'PULL', 'PIERCE'
  ];
  const modifierIcons = [
    '2X', 'MISS', 'PLUS_0', 'PLUS_1', 'PLUS_2', 'PLUS_3', 'PLUS_4', 'MINUS_1', 'MINUS_2'
  ];

  let folder = 'general';
  if (elementIcons.includes(upperIcon)) folder = 'elements';
  else if (conditionIcons.includes(upperIcon)) folder = 'conditions';
  else if (modifierIcons.includes(upperIcon)) folder = 'modifiers';

  const iconElement = filename ? (
    <img
      src={`${import.meta.env.BASE_URL}assets/${folder}/${filename}`}
      alt={icon}
      title={icon}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
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
