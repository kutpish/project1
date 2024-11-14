import React from 'react';
import { Check, Trash2, Clock } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  settings: any;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, settings }) => {
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));

    if (settings.sound) {
      const audio = new Audio('/sounds/complete.mp3');
      audio.volume = settings.soundVolume;
      audio.play().catch(() => {});
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
            todo.completed
              ? 'bg-green-50 dark:bg-green-900/20'
              : 'bg-gray-50 dark:bg-gray-700/50'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                todo.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-500'
              }`}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <span
              className={`text-lg ${
                todo.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800 dark:text-white'
              }`}
            >
              {todo.title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {todo.dueDate && (
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </div>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;