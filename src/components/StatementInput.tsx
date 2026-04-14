import React from 'react';
import { Input } from "@/components/ui/input";

interface StatementInputProps {
  onStatementSubmit: (statement: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const StatementInput: React.FC<StatementInputProps> = ({
  onStatementSubmit,
  placeholder = 'Enter your statement…',
  disabled = false,
}) => {
  const [statement, setStatement] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = statement.trim();
    if (!trimmed) return;
    onStatementSubmit(trimmed);
    setStatement('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        disabled={disabled}
        className="font-mono text-xs bg-background border-border text-foreground placeholder:text-muted-foreground/50 rounded-none"
      />
      <button
        type="submit"
        disabled={disabled || !statement.trim()}
        className="shrink-0 font-mono text-xs px-3 py-2 border border-primary/50 text-primary hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Post
      </button>
    </form>
  );
};

export default StatementInput;
