import React, { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import Token from '@/components/Token';
import StatementInput from '@/components/StatementInput';
import StatementDisplay from '@/components/StatementDisplay';
import { LoginArea } from "@/components/auth/LoginArea";
import { RelaySelector } from "@/components/RelaySelector";
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useToast } from '@/hooks/useToast';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Statement {
  text: string;
  pubkey?: string;
  published: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const DEBATE_TAG = 'truthstakes';

const FizxLogo = () => (
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
);

// ── Main page ─────────────────────────────────────────────────────────────────

const Index = () => {
  const { user } = useCurrentUser();
  const { mutate: publish, isPending } = useNostrPublish();
  const { toast } = useToast();

  const [score1, setScore1] = useState(21);
  const [score2, setScore2] = useState(21);
  const [statements1, setStatements1] = useState<Statement[]>([]);
  const [statements2, setStatements2] = useState<Statement[]>([]);

  // Submit a statement for a side, optionally publish to Nostr
  const handleSubmit = (side: 1 | 2, text: string) => {
    const statement: Statement = {
      text,
      pubkey: user?.pubkey,
      published: false,
    };

    // Update local state immediately
    if (side === 1) {
      setStatements1(prev => [{ ...statement }, ...prev]);
    } else {
      setStatements2(prev => [{ ...statement }, ...prev]);
    }

    // If the user is logged in, publish to Nostr
    if (user) {
      publish(
        {
          kind: 1,
          content: text,
          tags: [
            ['t', DEBATE_TAG],
            ['t', `side-${side}`],
          ],
        },
        {
          onSuccess: () => {
            // Mark as published
            if (side === 1) {
              setStatements1(prev =>
                prev.map((s, i) => (i === 0 ? { ...s, published: true } : s))
              );
            } else {
              setStatements2(prev =>
                prev.map((s, i) => (i === 0 ? { ...s, published: true } : s))
              );
            }
          },
          onError: () => {
            toast({ title: 'Publish failed', description: 'Statement saved locally only.', variant: 'destructive' });
          },
        }
      );
    }
  };

  const adjudicate = (winner: 1 | 2) => {
    if (winner === 1) {
      setScore1(s => s + 1);
      setScore2(s => Math.max(0, s - 1));
    } else {
      setScore1(s => Math.max(0, s - 1));
      setScore2(s => s + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="https://fizx.uk" className="flex items-center gap-2" aria-label="fizx.uk">
            <FizxLogo />
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

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            <span className="bg-gradient-to-r from-[#34d399] via-[#a78bfa] to-[#34d399] bg-clip-text text-transparent">
              stakes
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            A Nostr-powered debate — submit statements, vote with sats, let the truth win.
            {!user && (
              <span className="ml-2 text-muted-foreground/50">
                (Log in to publish statements to Nostr.)
              </span>
            )}
          </p>
        </div>

        {/* Score board */}
        <section>
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Score
          </h2>
          <div className="bg-card border border-border p-4">
            <GameBoard score1={score1} score2={score2} label1="Side A" label2="Side B" />
          </div>
        </section>

        {/* Adjudicate */}
        <section>
          <h2 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Adjudicate
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => adjudicate(1)}
              className="font-mono text-xs px-4 py-2 border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
            >
              Side A Wins Round
            </button>
            <button
              onClick={() => adjudicate(2)}
              className="font-mono text-xs px-4 py-2 border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
            >
              Side B Wins Round
            </button>
          </div>
        </section>

        {/* Two-column statement panels */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Side A */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Token side="a" value={score1} />
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-primary">
                Side A
              </h2>
            </div>
            <StatementInput
              onStatementSubmit={(text) => handleSubmit(1, text)}
              placeholder="State your case for Side A…"
              disabled={isPending}
            />
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {statements1.length === 0 ? (
                <p className="text-[11px] font-mono text-muted-foreground/40 py-4 text-center">
                  No statements yet
                </p>
              ) : (
                statements1.map((s, i) => (
                  <StatementDisplay
                    key={i}
                    statement={s.text}
                    pubkey={s.pubkey}
                    published={s.published}
                  />
                ))
              )}
            </div>
          </section>

          {/* Side B */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Token side="b" value={score2} />
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-accent">
                Side B
              </h2>
            </div>
            <StatementInput
              onStatementSubmit={(text) => handleSubmit(2, text)}
              placeholder="State your case for Side B…"
              disabled={isPending}
            />
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {statements2.length === 0 ? (
                <p className="text-[11px] font-mono text-muted-foreground/40 py-4 text-center">
                  No statements yet
                </p>
              ) : (
                statements2.map((s, i) => (
                  <StatementDisplay
                    key={i}
                    statement={s.text}
                    pubkey={s.pubkey}
                    published={s.published}
                  />
                ))
              )}
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-xs text-muted-foreground font-mono">
          <span>stakes.fizx.uk</span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {([
              ['https://fizx.uk',         'fizx.uk'],
              ['https://glimpse.fizx.uk', 'glimpse'],
              ['https://pulse.fizx.uk',   'pulse'],
              ['https://ln.fizx.uk',      'ln'],
              ['https://stakes.fizx.uk',  'stakes'],
              ['https://sonic.fizx.uk',   'sonic'],
            ] as [string, string][]).map(([href, label]) => (
              <a key={href} href={href} className="hover:text-primary transition-colors">{label}</a>
            ))}
            <span className="text-primary/60 ml-1">✦ built with claude</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
