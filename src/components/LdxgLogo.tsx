import React from 'react';

interface LdxgLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  glow?: boolean;
}

export const LdxgLogo: React.FC<LdxgLogoProps> = ({
  size = 'md',
  className = '',
  glow = false,
}) => {
  let dimension = 40;
  if (typeof size === 'number') {
    dimension = size;
  } else {
    switch (size) {
      case 'xs':
        dimension = 20;
        break;
      case 'sm':
        dimension = 28;
        break;
      case 'md':
        dimension = 40;
        break;
      case 'lg':
        dimension = 56;
        break;
      case 'xl':
        dimension = 80;
        break;
    }
  }

  return (
    <div 
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${glow ? 'gold-glow' : ''} ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <img
        src="/ldxg-logo.svg"
        alt="LondonCoinGold (LDXG) Logo"
        width={dimension}
        height={dimension}
        className="w-full h-full object-contain rounded-full shadow-md"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
