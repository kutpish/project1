import React from 'react';
import { Check } from 'lucide-react';

interface QuestionPanelProps {
  question: { num1: number; num2: number; operation: string; answer: number };
  userAnswer: string;
  consecutiveFailures: number;
  onAnswerChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onCheck: () => void;
  onShowAnswer: () => void;
}

export function QuestionPanel({
  question,
  userAnswer,
  consecutiveFailures,
  onAnswerChange,
  onKeyPress,
  onCheck,
  onShowAnswer,
}: QuestionPanelProps) {
  return (
    <div className="bg-purple-50 rounded-xl p-6 mb-6">
      <p className="text-2xl text-center font-semibold text-gray-700 mb-4">
        {question.num1} {question.operation} {question.num2} = ?
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyPress={onKeyPress}
          className="w-full px-4 py-2 text-lg border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Your answer"
        />
        <button
          onClick={onCheck}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
        >
          <Check className="w-5 h-5" />
          Check
        </button>
      </div>
      {consecutiveFailures >= 3 && (
        <button
          onClick={onShowAnswer}
          className="w-full mt-4 px-4 py-2 text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
        >
          Show Answer
        </button>
      )}
    </div>
  );
}