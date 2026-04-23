import React from 'react';

type ElementType = 'Fire' | 'Ice' | 'Air' | 'Earth' | 'Light' | 'Dark' | 'Wild' | 'Any' | string;

interface ElementIconProps {
  element: ElementType;
  size?: number;
  className?: string;
}

const ELEMENT_MAP: Record<string, string> = {
  'fire': 'fh-fire-bw-icon.png',
  'ice': 'fh-ice-bw-icon.png',
  'air': 'fh-air-bw-icon.png',
  'earth': 'fh-earth-bw-icon.png',
  'light': 'fh-light-bw-icon.png',
  'dark': 'fh-dark-bw-icon.png',
  'wild': 'fh-wild-bw-icon.png',
  'any': 'fh-wild-bw-icon.png'
};

export const ElementIcon: React.FC<ElementIconProps> = ({ element, size = 20, className = "" }) => {
  const lowerElement = element.toLowerCase();
  const filename = ELEMENT_MAP[lowerElement];

  if (!filename) {
    return <span className={className}>{element}</span>;
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/elements/${filename}`}
      alt={element}
      title={element}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        verticalAlign: 'middle',
        display: 'inline-block',
        filter: 'invert(1)'
      }}
      className={`element-icon ${className}`}
    />
  );
};
