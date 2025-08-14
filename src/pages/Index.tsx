import React from 'react';
import GameBoard from '@/components/GameBoard';
import Token from '@/components/Token';
import StatementInput from '@/components/StatementInput';
import StatementDisplay from '@/components/StatementDisplay';
import useGame from '@/hooks/useGame';
import { LoginArea } from "@/components/auth/LoginArea";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from '@/hooks/useAppContext';

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

  const { config, updateConfig } = useAppContext();

  const toggleTheme = () => {
    updateConfig((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LoginArea className="max-w-60" />
      <h1 className="text-4xl font-bold mb-4">Game 1</h1>
      <GameBoard />
      <div className="flex space-x-4">
        <div>
          <Token color="black" value={player1Score} />
          <StatementInput onStatementSubmit={(statement) => handleStatementSubmit(1, statement)} />
          {player1Statement && <StatementDisplay statement={player1Statement} />}
        </div>
        <div>
          <Token color="white" value={player2Score} />
          <StatementInput onStatementSubmit={(statement) => handleStatementSubmit(2, statement)} />
          {player2Statement && <StatementDisplay statement={player2Statement} />}
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => handleAgree(1)}>Player 1 Wins</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => handleAgree(2)}>Player 2 Wins</button>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <span>{config.theme === 'light' ? 'Light' : 'Dark'}</span>
        <Switch checked={config.theme === 'dark'} onCheckedChange={toggleTheme} />
      </div>
      Vibed with MKStack <a href="https://soapbox.pub/mkstack">https://soapbox.pub/mkstack</a>
    </div>
  );
};

export default Index;