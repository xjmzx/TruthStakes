import React from 'react';

interface StatementDisplayProps {
  statement: string;
}

const StatementDisplay: React.FC<StatementDisplayProps> = ({ statement }) => {
  return (
    <div className="p-4 border border-gray-400 rounded-md bg-gray-100">
      {statement}
    </div>
  );
};

export default StatementDisplay;