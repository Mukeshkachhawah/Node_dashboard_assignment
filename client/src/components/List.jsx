import React, { useState, useEffect } from "react";
import API from "../api";
import Task from "./Task";

const List = ({ list, fetchLists }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const { data } = await API.get(`/tasks/${list._id}`);
      setTasks(data);
    } catch (err) {
      console.error(
        "Error fetching tasks:",
        err.response ? err.response.data : err.message
      );
    }
  };

  useEffect(() => {
    getTasks();
  }, [list]);

  const handleDrop = async (ev, targetListId) => {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("text");

    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      await API.put(`/tasks/update/${taskId}`, { listId: targetListId });

      fetchLists();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDragStart = (ev, taskId) => {
    ev.dataTransfer.setData("text", taskId); // Save the task ID in dataTransfer
  };

  return (
    <div
      style={{
        margin: "10px",
        padding: "10px",
        border: "1px solid black",
        minWidth: "200px",
      }}
      onDrop={(e) => handleDrop(e, list._id)}
      onDragOver={(e) => e.preventDefault()} // Allow dropping
    >
      <h3>{list.name}</h3>
      <button onClick={() => setShowTaskInput(!showTaskInput)}>
        {showTaskInput ? "Cancel" : "+ Add Task"}
      </button>
      {showTaskInput && (
        <Task list={list} fetchLists={fetchLists} getTasks={getTasks} />
      )}

      <div>
        {tasks.map((task) => (
          <button
            key={task._id}
            id={task._id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, task._id)} // Trigger drag
            style={{
              display: "block",
              marginBottom: "5px",
              padding: "8px",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {task.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
