import React from 'react';

interface TokenProps {
  side: 'a' | 'b';
  value: number;
}

const Token: React.FC<TokenProps> = ({ side, value }) => {
  return (
    <div
      className={`w-9 h-9 flex items-center justify-center font-bold font-mono text-sm border ${
        side === 'a'
          ? 'border-primary/60 text-primary bg-primary/10'
          : 'border-accent/60 text-accent bg-accent/10'
      }`}
    >
      {value}
    </div>
  );
};

export default Token;
