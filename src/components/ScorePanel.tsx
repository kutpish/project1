import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ScorePanelProps {
  score: { correct: number; total: number };
  onReset: () => void;
}

export function ScorePanel({ score, onReset }: ScorePanelProps) {
  const percentage = score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100);

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-gray-600">
        Score: {score.correct}/{score.total}
      </div>
      <div className="text-gray-600">
        Success Rate: {percentage}%
      </div>
      <button
        onClick={onReset}
        className="text-purple-500 hover:text-purple-600 flex items-center gap-1"
      >
        <RefreshCw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
}