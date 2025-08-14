import React from 'react';

const GameBoard = () => {
  return (
    <div className="bg-gray-800 border border-gray-500 rounded-md p-4">
      {/* Go board grid will be implemented here */}
      <div className="grid grid-cols-19 grid-rows-19 gap-1">
        {Array.from({ length: 19 * 19 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-gray-300 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;