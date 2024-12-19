import React, { useState } from "react";
import API from "../api"; // Assuming you have an API instance for backend calls

const Task = ({ list, fetchLists }) => {
  const [newTaskName, setNewTaskName] = useState("");

  const addNewTask = async () => {
    if (!newTaskName) return;

    try {
      const { data } = await API.post("/tasks/create", {
        name: newTaskName,
        listId: list._id,
      });

      setNewTaskName("");
      fetchLists();
    } catch (err) {
      console.log("Error creating task:", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New Task"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button onClick={addNewTask}>+ Add Task</button>
    </div>
  );
};

export default Task;
