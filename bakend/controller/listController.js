const ListModel = require("../model/listModel");
const TaskModel = require("../model/taskModel.js");

exports.createList = async (req, res) => {
  const { name, userId } = req.body;
  try {
    const list = await ListModel.create({ name, user: userId });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const lists = await ListModel.find({ user: userId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.moveTask = async (req, res) => {
  const { taskId, listId } = req.body;
  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.list = listId;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
