import React, { useState, useCallback } from 'react';
import { GameHeader } from './components/GameHeader';
import { QuestionPanel } from './components/QuestionPanel';
import { ScorePanel } from './components/ScorePanel';
import { generateQuestion } from './utils/mathGame';

interface MathQuestion {
  num1: number;
  num2: number;
  operation: string;
  answer: number;
}

export function generateQuestion(): MathQuestion {
  // ... rest of the code ...
}

function App() {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('text-gray-600');
  const [consecutiveFailures, setConsecutiveFailures] = useState(0);

  const checkAnswer = useCallback(() => {
    const numAnswer = parseInt(userAnswer);
    if (isNaN(numAnswer)) {
      setFeedback('Please enter a number');
      setFeedbackColor('text-yellow-500');
      return;
    }

    const isCorrect = numAnswer === question.answer;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      setFeedback('Correct! 🎉');
      setFeedbackColor('text-green-500');
      setConsecutiveFailures(0);
      setTimeout(() => {
        setQuestion(generateQuestion());
        setUserAnswer('');
        setFeedback('');
      }, 1000);
    } else {
      setFeedback('Try again! 💪');
      setFeedbackColor('text-red-500');
      setConsecutiveFailures(prev => prev + 1);
    }
  }, [userAnswer, question.answer]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const resetGame = () => {
    setScore({ correct: 0, total: 0 });
    setQuestion(generateQuestion());
    setUserAnswer('');
    setFeedback('');
    setConsecutiveFailures(0);
  };

  const showAnswer = () => {
    setFeedback(`The answer is ${question.answer}`);
    setFeedbackColor('text-blue-500');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">
        <GameHeader />

        <QuestionPanel
          question={question}
          userAnswer={userAnswer}
          consecutiveFailures={consecutiveFailures}
          onAnswerChange={setUserAnswer}
          onKeyPress={handleKeyPress}
          onCheck={checkAnswer}
          onShowAnswer={showAnswer}
        />

        {feedback && (
          <p className={`text-center text-lg font-semibold mb-4 ${feedbackColor}`}>
            {feedback}
          </p>
        )}

        <ScorePanel score={score} onReset={resetGame} />

        <div className="absolute bottom-2 right-4 text-sm text-gray-400">
          Credits: Salih Orhan
        </div>
      </div>
    </div>
  );
}

export default App;