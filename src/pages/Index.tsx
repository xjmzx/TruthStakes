import React from 'react';
import GameBoard from '@/components/GameBoard';
import Token from '@/components/Token';
import StatementInput from '@/components/StatementInput';
import StatementDisplay from '@/components/StatementDisplay';
import useGame from '@/hooks/useGame';
import { LoginArea } from "@/components/auth/LoginArea";
import { RelaySelector } from "@/components/RelaySelector";

const Index = () => {
  const {
    player1Score,
    player2Score,
    player1Statement,
    player2Statement,
    submitStatement,
    updateScores,
  } = useGame();

  const handleStatementSubmit = (player: 1 | 2, statement: string) => {
    submitStatement(player, statement);
  };

  const handleAgree = (winner: 1 | 2) => {
    updateScores(winner);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="https://fizx.uk" className="flex items-center gap-2 group" aria-label="fizx.uk">
            {/* fizx 4×4 favicon block */}
            <svg width="16" height="16" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <rect x="0" y="0" width="1" height="1" fill="#34d399"/>
              <rect x="1" y="0" width="1" height="1" fill="#a78bfa"/>
              <rect x="2" y="0" width="1" height="1" fill="#34d399"/>
              <rect x="3" y="0" width="1" height="1" fill="#a78bfa"/>
              <rect x="0" y="1" width="1" height="1" fill="#a78bfa"/>
              <rect x="1" y="1" width="1" height="1" fill="#34d399"/>
              <rect x="2" y="1" width="1" height="1" fill="#a78bfa"/>
              <rect x="3" y="1" width="1" height="1" fill="#34d399"/>
              <rect x="0" y="2" width="1" height="1" fill="#34d399"/>
              <rect x="1" y="2" width="1" height="1" fill="#a78bfa"/>
              <rect x="2" y="2" width="1" height="1" fill="#34d399"/>
              <rect x="3" y="2" width="1" height="1" fill="#a78bfa"/>
              <rect x="0" y="3" width="1" height="1" fill="#a78bfa"/>
              <rect x="1" y="3" width="1" height="1" fill="#34d399"/>
              <rect x="2" y="3" width="1" height="1" fill="#a78bfa"/>
              <rect x="3" y="3" width="1" height="1" fill="#34d399"/>
            </svg>
            <span className="font-mono text-sm">
              <span className="bg-gradient-to-r from-[#34d399] via-[#a78bfa] to-[#34d399] bg-clip-text text-transparent font-bold">
                stakes
              </span>
              <span className="text-muted-foreground">.fizx.uk</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <RelaySelector />
            <LoginArea className="max-w-48" />
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            <span className="bg-gradient-to-r from-[#34d399] via-[#a78bfa] to-[#34d399] bg-clip-text text-transparent">
              TruthStakes
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            A Nostr-powered debate game — submit statements, vote with sats, let the truth win.
          </p>
        </div>

        {/* Game board */}
        <section>
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Board
          </h2>
          <GameBoard />
        </section>

        {/* Players */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player 1 */}
          <div className="bg-card border border-border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Token color="black" value={player1Score} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Player 1
              </span>
            </div>
            <StatementInput onStatementSubmit={(s) => handleStatementSubmit(1, s)} />
            {player1Statement && <StatementDisplay statement={player1Statement} />}
          </div>

          {/* Player 2 */}
          <div className="bg-card border border-border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Token color="white" value={player2Score} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Player 2
              </span>
            </div>
            <StatementInput onStatementSubmit={(s) => handleStatementSubmit(2, s)} />
            {player2Statement && <StatementDisplay statement={player2Statement} />}
          </div>
        </section>

        {/* Adjudicate */}
        <section>
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Adjudicate
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => handleAgree(1)}
              className="font-mono text-xs px-4 py-2 border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
            >
              Player 1 Wins
            </button>
            <button
              onClick={() => handleAgree(2)}
              className="font-mono text-xs px-4 py-2 border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
            >
              Player 2 Wins
            </button>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>stakes.fizx.uk</span>
          <span className="text-primary/60">✦ built with claude</span>
        </div>
      </footer>

    </div>
  );
};

export default Index;
