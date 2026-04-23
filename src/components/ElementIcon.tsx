import React from 'react';

type ElementType = 'Fire' | 'Ice' | 'Air' | 'Earth' | 'Light' | 'Dark' | 'Wild' | 'Any' | string;

interface ElementIconProps {
  element: ElementType;
  size?: number;
  className?: string;
}

const ELEMENT_MAP: Record<string, string> = {
  'fire': 'fh-fire-color-icon.png',
  'ice': 'fh-ice-color-icon.png',
  'air': 'fh-air-color-icon.png',
  'earth': 'fh-earth-color-icon.png',
  'light': 'fh-light-color-icon.png',
  'dark': 'fh-dark-color-icon.png',
  'wild': 'fh-wild-color-icon.png',
  'any': 'fh-wild-color-icon.png'
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
        verticalAlign: 'middle',
        display: 'inline-block'
      }}
      className={`element-icon ${className}`}
    />
  );
};
