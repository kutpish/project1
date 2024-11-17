import React from 'react';
import { Brain } from 'lucide-react';

export function GameHeader() {
  return (
    <div className="flex items-center justify-center mb-8">
      <Brain className="w-8 h-8 text-purple-500 mr-2" />
      <h1 className="text-3xl font-bold text-gray-800">Math Challenge</h1>
    </div>
  );
}