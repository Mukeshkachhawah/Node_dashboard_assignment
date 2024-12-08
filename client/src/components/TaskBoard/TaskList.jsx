import React from 'react';
import TaskItem from './TaskItem';


const TaskList = ({ tasks, onDragEnd, onUpdate, onDelete }) => {
  if (!Array.isArray(tasks)) {
    return <div>No tasks available</div>;
  }

  return (
    <div className="task-list-container">
      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onDragEnd={onDragEnd}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;