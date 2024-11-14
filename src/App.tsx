import React, { useState, useEffect } from 'react';
import { Bell, Plus, Settings, Check, Trash2, Volume2, Clock, Sun, Moon } from 'lucide-react';
import TodoList from './components/TodoList';
import SettingsModal from './components/SettingsModal';
import NewTodoModal from './components/NewTodoModal';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      notifications: true,
      sound: true,
      soundVolume: 0.5,
      reminderTime: 5,
      theme: 'light',
      notificationSound: 'ping'
    };
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transition-colors duration-200">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">TaskMaster</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewTodo(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                New Task
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </header>

          <TodoList
            todos={todos}
            setTodos={setTodos}
            settings={settings}
          />
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          settings={settings}
          setSettings={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showNewTodo && (
        <NewTodoModal
          onClose={() => setShowNewTodo(false)}
          onAdd={(todo) => {
            setTodos([...todos, todo]);
            setShowNewTodo(false);
          }}
        />
      )}
    </div>
  );
}

export default App;