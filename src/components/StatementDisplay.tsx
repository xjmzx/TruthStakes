import React from 'react';

interface StatementDisplayProps {
  statement: string;
  pubkey?: string;
  published?: boolean;
}

const StatementDisplay: React.FC<StatementDisplayProps> = ({
  statement,
  pubkey,
  published = false,
}) => {
  return (
    <div className="border border-border/60 bg-card/50 px-3 py-2 space-y-1">
      <p className="text-xs text-foreground/80 font-mono leading-relaxed">{statement}</p>
      <div className="flex items-center gap-2">
        {pubkey && (
          <span className="text-[10px] font-mono text-muted-foreground/50">
            {pubkey.slice(0, 8)}…{pubkey.slice(-4)}
          </span>
        )}
        {published && (
          <span className="text-[10px] font-mono text-primary/60">✦ on nostr</span>
        )}
      </div>
    </div>
  );
};

export default StatementDisplay;
