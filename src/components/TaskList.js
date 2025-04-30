import React from 'react';

function TaskList({ tasks, onClickTask, onToggleComplete, completed, editingIndex }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li
          key={index}
          onClick={() => onClickTask(task, index)}
          onDoubleClick={() => onToggleComplete(index)}
          style={{
            cursor: 'pointer',
            textDecoration: completed.includes(index) ? 'line-through' : 'none',
            color: completed.includes(index) ? 'gray' : 'black',
            backgroundColor: editingIndex === index ? '#e0f7fa' : 'transparent',
            padding: '6px',
            marginBottom: '5px',
            borderRadius: '4px',
          }}
        >
          {task}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
