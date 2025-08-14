import { useState } from 'react';

const useGame = () => {
  const [player1Score, setPlayer1Score] = useState(21);
  const [player2Score, setPlayer2Score] = useState(21);
  const [player1Statement, setPlayer1Statement] = useState('');
  const [player2Statement, setPlayer2Statement] = useState('');

  const submitStatement = (player: 1 | 2, statement: string) => {
    if (player === 1) {
      setPlayer1Statement(statement);
    } else {
      setPlayer2Statement(statement);
    }
  };

  const updateScores = (winner: 1 | 2) => {
    if (winner === 1) {
      setPlayer1Score(player1Score + 1);
      setPlayer2Score(player2Score - 1);
    } else {
      setPlayer1Score(player1Score - 1);
      setPlayer2Score(player2Score + 1);
    }
  };

  return {
    player1Score,
    player2Score,
    player1Statement,
    player2Statement,
    submitStatement,
    updateScores,
  };
};

export default useGame;