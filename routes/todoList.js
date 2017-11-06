var mongoose = require('mongoose'),
Task = require('../models/tasks.js')

module.exports = function (router) {
    
    var taskRoute = router.route('/tasks');
    
    taskRoute.get(function(req, res) {
        
        console.log(req.query);
        console.log(req.query.where)
        
        par = {};
        if(req.query.where) {
            par.where = JSON.parse(req.query.where);
        }
        if(req.query.limit) {
            par.limit  = JSON.parse(req.query.limit);
        }
        else {
            par.limit = 100;
        }
        if(req.query.sort) {
            par.sort = JSON.parse(req.query.sort);
        }
        if(req.query.skip) {
            par.skip = JSON.parse(req.query.skip);
        }
        if(req.query.count) {
            par.count = JSON.parse(req.query.count);
        }
        
        
        Task.find({}, [], par, function(err, task) {
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
                     data: task.query.and
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
