var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  deadline: Date,
  status: {
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