var mongoose = require('mongoose'),
Task = require('../models/tasks.js')

module.exports = function (router) {
    
    var taskRoute = router.route('/tasks');
    
    taskRoute.get(function(req, res) {
        res.set({ 'Content-Type': 'application/json; charset=utf-8' });
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
                    {message: "err",
                     data: []
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "OK",
                     data: par.count ? task.length : task
                    }
                );
            }
        });
    });
    
    taskRoute.post(function(req, res) {
        res.set({ 'Content-Type': 'application/json; charset=utf-8' });
        var new_task = new Task(req.body);
        console.log(new_task);
        new_task.save(function(err, task) {
            if (err) {
                res.status(500).send(
                    {message: "err", 
                     data:[]
                    }
                );
            }
            else {
                res.status(201).send(
                    {message: "OK",
                     data: task
                    }
                );
            }
        });
    });
    
    var taskIdRoute = router.route('/tasks/:id');
    
    taskIdRoute.get(function(req, res) {
        res.set({ 'Content-Type': 'application/json; charset=utf-8' });
        Task.findById(req.params.id, function(err, task) {
            if (err) {
                res.status(404).send(
                    {message: "err",
                     data: []
                    }
                );
            }
            else if (!task) {
                res.status(404).send(
                    {message: "err",
                     data:[]
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "Got specific task",
                     data: task
                    }
                );
            }
        });
    });
    
    taskIdRoute.put(function(req, res) {
        res.set({ 'Content-Type': 'application/json; charset=utf-8' });
        console.log(req.params.id);
        Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, task) {
            if (err) {
                res.status(404).send(
                    {message: "err",
                     data: []
                    }
                );
            }
            else if (!task) {
                res.status(404).send(
                    {message: "err",
                     data:[]
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "Replaced specific task",
                     data: task
                    }
                );
            }
        });
    });
    
    taskIdRoute.delete(function(req, res) {
        Task.findOneAndRemove(req.params.id, function(err, task) {
            if (err) {
                res.status(404).send(
                    {message: "err",
                     data:[]
                    }
                );
            }
            else if (!task) {
                res.status(404).send(
                    {message: "err",
                     data:[]
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "Task successfully deleted",
                     data:null
                    }
                );
            }
        });
    });
    
    
    return router;
}
