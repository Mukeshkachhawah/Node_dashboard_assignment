import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onDragEnd, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/${task._id}`, { title: newTitle }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onUpdate(task._id, newTitle);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/${task._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onDelete(task._id);
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className="task-item" draggable onDragEnd={onDragEnd}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;