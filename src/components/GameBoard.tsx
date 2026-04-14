import React from 'react';

interface GameBoardProps {
  score1: number;
  score2: number;
  label1?: string;
  label2?: string;
}

/**
 * Debate score bar.
 * Renders a horizontal gauge showing the relative score balance between two sides.
 * total starts at 42 (21 each). Side A fills from the left (emerald),
 * Side B fills from the right (purple).
 */
const GameBoard: React.FC<GameBoardProps> = ({
  score1,
  score2,
  label1 = 'Side A',
  label2 = 'Side B',
}) => {
  const total = score1 + score2;
  const pct1 = total > 0 ? (score1 / total) * 100 : 50;
  const pct2 = 100 - pct1;

  return (
    <div className="space-y-3">
      {/* Score labels */}
      <div className="flex justify-between font-mono text-sm">
        <span className="text-primary font-bold">{label1} · {score1}</span>
        <span className="text-accent font-bold">{score2} · {label2}</span>
      </div>

      {/* Score bar */}
      <div className="h-3 bg-border/30 flex overflow-hidden">
        <div
          className="bg-primary transition-all duration-700"
          style={{ width: `${pct1}%` }}
        />
        <div
          className="bg-accent transition-all duration-700"
          style={{ width: `${pct2}%` }}
        />
      </div>

      {/* Grid of 21 squares per side as a visual token row */}
      <div className="flex gap-1">
        {Array.from({ length: 21 }).map((_, i) => (
          <div
            key={`a-${i}`}
            className="flex-1 h-1.5 transition-all duration-300"
            style={{
              backgroundColor: i < score1
                ? 'rgb(52 211 153)'       // emerald filled
                : 'rgb(30 45 61)',         // border dim
            }}
          />
        ))}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 21 }).map((_, i) => (
          <div
            key={`b-${i}`}
            className="flex-1 h-1.5 transition-all duration-300"
            style={{
              backgroundColor: i < score2
                ? 'rgb(167 139 250)'      // purple filled
                : 'rgb(30 45 61)',         // border dim
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
