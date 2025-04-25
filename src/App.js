import React, { useState } from 'react';
import TaskList from './components/TaskList'; // Import the TaskList component
import './App.css'; // Import CSS for styling

function App() {
  const [tasks, setTasks] = useState([
    'Learn React',
    'Build a project',
    'Write documentation'
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Set task for editing when clicked
  const handleClickTask = (task, index) => {
    setEditingIndex(index);
    setEditTask(task);
  };

  // Update the task
  const handleUpdateTask = () => {
    if (editTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = editTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditTask('');
    }
  };

  // Delete the task
  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((_, index) => index !== editingIndex);
    setTasks(updatedTasks);
    setEditingIndex(null); // Clear the editing state
    setEditTask('');
  };

  // Remove all tasks
  const handleRemoveAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>Task List</h1>

      {/* Input field to add new tasks */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      {/* Render Task List component */}
      <TaskList tasks={tasks} onClickTask={handleClickTask} />

      {/* Only show this part if a task is being edited */}
      {editingIndex !== null && (
        <div>
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            placeholder="Update task"
          />
          <button onClick={handleUpdateTask}>Update Task</button>
          <button onClick={handleDeleteTask}>Delete Task</button>
        </div>
      )}

      {/* Delete all tasks */}
      <button onClick={handleRemoveAllTasks}>Delete All Tasks</button>
    </div>
  );
}

export default App;
