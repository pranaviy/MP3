var User = require('../models/user.js');

module.exports = function (router) {

    var userRoute = router.route('/users');
    
    userRoute.get(function(req, res) {
    
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
        
        User.find({}, [], par, function(err, user) {
            if (err) {
                res.status(500).send(
                    {message: err,
                     data: []
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "OK",
                     data: par.count ? user.length : user  
                    }
                );
            }
        });
    });
    
    userRoute.post(function(req, res) {
        var new_user = new User(req.body);
        new_user.save(function(err, user) {
            if (err) {
                res.status(500).send(
                    {message: err,
                     data:[]
                    }
                );
            }
            else {
                res.status(201).send(
                    {message: "OK",
                     data:user
                    }
                );
            }
        });
    });
    
    var userIdRoute = router.route('/users/:id');
    
    //get, put, delete
    userIdRoute.get(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.status(404).send(
                    {message: "err",
                     data: []
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "Got specific user",
                     data: user
                    }
                );
            }
        });
    });
    
    userIdRoute.post(function(req, res) {
        console.log(req.params);
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
            if (err) {
                res.status(404).send(
                    {message: "err",
                     data:[]
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "Replaced specific user", 
                     data:user
                    }
                );
            }
        });
    });
    
    userIdRoute.delete(function(req, res) {
        User.remove({_id: req.params.id}, function(err, user) {
            if (err) {
                res.status(404).send(
                    {message: "err", 
                     data:null
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "User successfully deleted",
                     data:null
                    }
                );
            }
        });
    });
    
    
    return router;
}
