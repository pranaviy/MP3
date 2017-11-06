var User = require('../models/user.js');

module.exports = function (router) {

    var userRoute = router.route('/users');
    
    userRoute.get(function(req, res) {
        User.find({}, function(err, user) {
            if (err) {
                res.status(500).send(
                    {message: "error GETing users",
                     data: []
                    }
                );
            }
            else {
                res.status(200).send(
                    {message: "OK",
                     data: user
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
    
    var userIdRoute = router.route('/users/:id');
    
    //get, put, delete
    userIdRoute.get(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                res.status(404).send(
                    {message: err,
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
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
            if (err) {
                res.status(404).send(
                    {message: err}
                );
            }
            else {
                res.status(200).send(
                    {message: "Replaced specific user"}
                );
            }
        });
    });
    
    userIdRoute.delete(function(req, res) {
        User.remove({_id: req.params.id}, function(err, user) {
            if (err) {
                res.status(404).send(
                    {message: err}
                );
            }
            else {
                res.status(200).send(
                    {message: "User successfully deleted"}
                );
            }
        });
    });
    
    
    return router;
}
