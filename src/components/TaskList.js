import React from 'react';

function TaskList({ tasks, onClickTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} onClick={() => onClickTask(task, index)}>
          {task}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
