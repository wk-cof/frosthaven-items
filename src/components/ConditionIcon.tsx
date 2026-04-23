import React from 'react';

type ConditionType = 
  | 'Poison' | 'Wound' | 'Muddle' | 'Immobilize' | 'Disarm' 
  | 'Stun' | 'Invisible' | 'Strengthen' | 'Bless' | 'Curse'
  | 'Ward' | 'Brittle' | 'Bane' | 'Impair' | 'Regenerate'
  | string;

interface ConditionIconProps {
  condition: ConditionType;
  size?: number;
  className?: string;
  isImmune?: boolean;
}

export const ConditionIcon: React.FC<ConditionIconProps> = ({ 
  condition, 
  size = 20, 
  className = "",
  isImmune = false
}) => {
  const lowerCondition = condition.toLowerCase();
  
  // Construct filename: fh-{condition}-{immune?}-color-icon.png
  const suffix = isImmune ? '-immune-color-icon.png' : '-color-icon.png';
  const filename = `fh-${lowerCondition}${suffix}`;

  // Fallback for icons that might not exist or have different naming
  // For now we assume they follow the pattern based on the list_dir output
  
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/conditions/${filename}`}
      alt={condition}
      title={condition}
      onError={(e) => {
        // Fallback to text if image fails
        (e.target as HTMLImageElement).style.display = 'none';
        const span = document.createElement('span');
        span.innerText = condition;
        (e.target as HTMLImageElement).parentNode?.appendChild(span);
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        verticalAlign: 'middle',
        display: 'inline-block'
      }}
      className={`condition-icon ${className}`}
    />
  );
};
