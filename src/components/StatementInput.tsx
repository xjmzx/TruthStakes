import React from 'react';
import { Input } from "@/components/ui/input";

interface StatementInputProps {
  onStatementSubmit: (statement: string) => void;
}

const StatementInput: React.FC<StatementInputProps> = ({ onStatementSubmit }) => {
  const [statement, setStatement] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStatementSubmit(statement);
    setStatement('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter your statement"
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
};

export default StatementInput;