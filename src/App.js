import React, { useState } from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    'Learn React',
    'Build a project',
    'Write documentation'
  ]);

  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [filter, setFilter] = useState('all'); // all | active | completed

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleClickTask = (task, index) => {
    setEditingIndex(index);
    setEditTask(task);
  };

  const handleUpdateTask = () => {
    if (editTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = editTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditTask('');
    }
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((_, index) => index !== editingIndex);
    setTasks(updatedTasks);
    setCompleted(completed.filter(i => i !== editingIndex));
    setEditingIndex(null);
    setEditTask('');
  };

  const handleRemoveAllTasks = () => {
    setTasks([]);
    setCompleted([]);
    setEditingIndex(null);
    setEditTask('');
  };

  const handleClearCompleted = () => {
    const newTasks = tasks.filter((_, i) => !completed.includes(i));
    setTasks(newTasks);
    setCompleted([]);
  };

  const handleToggleComplete = (index) => {
    setCompleted(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getFilteredTasks = () => {
    return tasks.filter((_, index) => {
      if (filter === 'completed') return completed.includes(index);
      if (filter === 'active') return !completed.includes(index);
      return true;
    });
  };

  return (
    <div className="App">
      <h1>Task List</h1>

      <input
        type="text"
        value={newTask}
        placeholder="Enter new task"
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <TaskList
        tasks={getFilteredTasks()}
        onClickTask={handleClickTask}
        onToggleComplete={handleToggleComplete}
        completed={completed}
        editingIndex={editingIndex}
      />

      {editingIndex !== null && (
        <div>
          <input
            type="text"
            value={editTask}
            placeholder="Update task"
            onChange={(e) => setEditTask(e.target.value)}
          />
          <button onClick={handleUpdateTask}>Update</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </div>
      )}

      <div className="footer-buttons">
        <button onClick={handleClearCompleted}>Clear Completed</button>
        <button onClick={handleRemoveAllTasks}>Delete All</button>
      </div>
    </div>
  );
}

export default App;
