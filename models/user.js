// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "You must enter your name"
    },
    email: {
        type: String,
        required: "Please enter a valid email address"
    },
    pendingTasks: [String],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
