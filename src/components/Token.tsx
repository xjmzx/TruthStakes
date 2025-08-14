import React from 'react';

interface TokenProps {
  color: 'black' | 'white';
  value: number;
}

const Token: React.FC<TokenProps> = ({ color, value }) => {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${color === 'black' ? 'bg-gray-800' : 'bg-gray-200 text-black'} border border-gray-500`}>
      {value}
    </div>
  );
};

export default Token;