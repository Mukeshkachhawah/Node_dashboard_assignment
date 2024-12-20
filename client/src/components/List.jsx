import { useState, useEffect } from "react";
import API from "../api";
import Task from "./Task";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { ChromePicker } from "react-color"; // Importing ChromePicker
import ColorLensIcon from "@mui/icons-material/ColorLens"; // Importing ColorLensIcon

const List = ({ list, fetchLists }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [listColor, setListColor] = useState(list.color || "#121212"); // Set initial color if available

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

  const handleColorChange = (color) => {
    setListColor(color.hex); // Update the list's color
    // Optionally, save the color to your backend (e.g., updating the list's color in the database)
    // await API.put(`/lists/update/${list._id}`, { color: color.hex });
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker); // Toggle visibility of color picker
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
    <Card
      sx={{
        margin: 2,
        padding: 2,
        minWidth: 200,
        maxWidth: 300,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: listColor, // Use list-specific color for background
        color: "white",
      }}
      onDrop={(e) => handleDrop(e, list._id)}
      onDragOver={(e) => e.preventDefault()} // Allow dropping
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {list.name}
        </Typography>

        {showTaskInput && (
          <Task list={list} fetchLists={fetchLists} getTasks={getTasks} />
        )}

        <Box sx={{ marginTop: 2 }}>
          {tasks.map((task) => (
            <Paper
              key={task._id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, task._id)} // Trigger drag
              sx={{
                marginBottom: 1,
                padding: 1,
                backgroundColor: "#333", // Dark background for tasks
                color: "white", // White text color for tasks
                borderRadius: 1,
                cursor: "move",
              }}
            >
              <Typography variant="body2">{task.name}</Typography>
            </Paper>
          ))}
        </Box>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => setShowTaskInput(!showTaskInput)}
          sx={{
            color: "white", // Text color white
          }}
        >
          {showTaskInput ? "Cancel" : "+ Add Task"}
        </Button>

        {/* Color picker icon */}
        <Button
          onClick={toggleColorPicker}
          variant="outlined"
          sx={{ marginTop: 2, display: "flex", alignItems: "center" }}
        >
          <ColorLensIcon sx={{ marginRight: 1 }} /> {/* Icon before text */}
          {showColorPicker ? "Hide Color Picker" : "Choose List Color"}
        </Button>

        {showColorPicker && (
          <ChromePicker
            color={listColor}
            onChangeComplete={handleColorChange}
            sx={{ marginTop: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default List;
