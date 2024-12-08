const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{ 
        type: String, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    }, 
    completed: { 
        type: Boolean, 
        default: false 
    }
  });

const taskModel = mongoose.model('Task',taskSchema)

module.exports = taskModel