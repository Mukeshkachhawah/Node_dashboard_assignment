
const taskModel = require('../model/taskModel')


exports.handlecreate = async (req, res) => {
  try {
    const { title, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).send({ error: 'Title and userId are required' });
    }
    const task = new taskModel({ title, userId });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send({ error: 'Server error', details: err.message });
  }
};

  exports.handledelete = async (req, res) => {
    try {
      const { taskId } = req.params;
      await taskModel.findByIdAndDelete(taskId);
      res.status(200).send({ message: 'Task deleted' });
    } catch (error) {
      res.status(400).send({ error: 'Error deleting task', details: error.message });
    }
  };

  exports.handleupdate = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { listName, completed } = req.body;
      const updateData = {};
  
      if (listName !== undefined) {
        updateData.listName = listName;
      }
      if (completed !== undefined) {
        updateData.completed = completed;
      }
  
      const task = await taskModel.findByIdAndUpdate(
        taskId,
        updateData,
        { new: true }
      );
      res.status(200).send(task);
    } catch (error) {
      res.status(400).send({ error: 'Error updating task', details: error.message });
    }
  };

  exports.handleget = async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await taskModel.find({ userId }).populate('userId', 'username');
      res.status(200).send(tasks);
    } catch (error) {
      res.status(400).send({ error: 'Error fetching tasks', details: error.message });
    }
  };