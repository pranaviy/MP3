var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  name: {
      type: String,
      required: 'Please enter the name of the task'
  },
  description: String,
  deadline: {
      type: Date,
      required: "You must enter a deadline"
  },
  completed: {
      type: Boolean,
      default: false
  },
  assignedUser: {
    type: String,
    default: 'unassigned'
  },
  assignedUserName: {
    type: String,
    default: 'unassigned' 
  },
  dateCreated: {
    type: Date,
    default: Date.now  
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);