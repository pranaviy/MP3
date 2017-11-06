var mongoose = require('mongoose'),
Task = require('../models/tasks.js')
var _ = require("underscore");

module.exports = function (router) {
    
    var taskRoute = router.route('/tasks');
    
    taskRoute.get(function(req, res) {
        Task.find({}, function(err, task) {
            if (err) {
                res.status(500).send(
                    {message: "error GETing tasks",
                     data: []
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "OK",
                     data: task
                    }
                );
            }
        });
    });
    
    taskRoute.post(function(req, res) {
        var new_task = new Task(req.body);
        new_task.save(function(err, task) {
            if (err) {
                res.status(500).send(
                    {message: err}
                );
            }
            else {
                res.status(201).send(
                    {message: "OK"}
                );
            }
        });
    });
    
    var taskIdRoute = router.route('/tasks/:id');
    
    //get, put, delete
    taskIdRoute.get(function(req, res) {
        Task.findById(req.params.id, function(err, task) {
            if (err) {
                res.status(404).send(
                    {message: err,
                     data: []
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "Got specific task",
                     data: _where(task, id)
                    }
                );
            }
        });
    });
    
    taskIdRoute.post(function(req, res) {
        Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
            if (err) {
                res.status(404).send(
                    {message: err}
                );
            }
            else {
                res.status(200).send(
                    {message: "Replaced specific task"}
                );
            }
        });
    });
    
    taskIdRoute.delete(function(req, res) {
        Task.remove({_id: req.params.id}, function(err, task) {
            if (err) {
                res.status(404).send(
                    {message: err}
                );
            }
            else {
                res.status(200).send(
                    {message: "Task successfully deleted"}
                );
            }
        });
    });
    
    
    return router;
}
