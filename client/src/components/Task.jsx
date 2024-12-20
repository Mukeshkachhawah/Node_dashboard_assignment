import React, { useState } from "react";
import API from "../api"; // Assuming you have an API instance for backend calls
import { Box, TextField, Button, Typography } from "@mui/material"; // Import Material UI components

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
    <Box
      sx={{
        backgroundColor: "black", // Black background for the task input area
        color: "white", // White text color
        padding: "16px",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add a New Task
      </Typography>

      <Button
        onClick={addNewTask}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#ff9800", // Orange button color
          color: "white", // White text color for the button
          "&:hover": {
            backgroundColor: "#e68900", // Darker orange on hover
          },
        }}
      >
        + Add Task
      </Button>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        sx={{
          backgroundColor: "#333", // Dark background for the text input
          color: "white", // White text color
          marginBottom: "16px",
          "& .MuiInputLabel-root": {
            color: "white", // White label color
          },
          "& .MuiOutlinedInput-root": {
            color: "white", // White input text
            "& fieldset": {
              borderColor: "white", // White border
            },
            "&:hover fieldset": {
              borderColor: "#ff9800", // Orange border on hover
            },
          },
        }}
      />
    </Box>
  );
};

export default Task;
