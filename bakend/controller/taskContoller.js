const TaskModel = require("../model/taskModel"); // Fix typo
const List = require("../model/listModel"); // Import List model

exports.createTask = async (req, res) => {
  const { name, listId } = req.body;
  try {
    const task = await TaskModel.create({ name, listId });
    await List.findByIdAndUpdate(listId, {
      $push: { tasks: task._id },
    });

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.completeTask = async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await TaskModel.findById(taskId);
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksForList = async (req, res) => {
  const { listId } = req.params;

  try {
    const tasks = await TaskModel.find({ listId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// In your taskController.js
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { listId } = req.body;

  try {
    const task = await TaskModel.findById(taskId);
    task.listId = listId; // Update the listId of the task
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
