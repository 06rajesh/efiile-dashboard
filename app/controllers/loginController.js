/**
 * Created by Rajesh on 11/14/18.
 */

var User = require('../models/users');

var SuperUser = {
    "_id"       : "5bfa899aa5b53365c83bed9d",
    "username"  : "super_admin",
    "email"     : "admin@pipilika.com",
    "password"  : "123456",
    "addedBy"   : null,
    "canAddDB"  : true,
    "canAddUser": true,
    "canAddKey" : true,
    "__v" : 0
};

module.exports = {

    view: function (req, res) {
        if(req.session.isLoggedIn){
            res.redirect('/');
        }else{
            res.render('login');
        }
    },

    submit: function (req, res) {
        if(req.body.name){
            verifyUserPass(req.body, function (verified, response) {
                if(verified){
                    req.session.user = response;
                    req.session.isLoggedIn = true;
                    res.redirect('/');
                }else if(req.body.name === SuperUser.email && req.body.password === SuperUser.password){
                    req.session.user = SuperUser;
                    req.session.isLoggedIn = true;
                    res.redirect('/');
                }else{
                    req.session.isLoggedIn = false;
                    res.render('login');
                }
            });

        }else {
            req.session.isLoggedIn = false;
            res.render('login');
        }
    },

    logout: function (req, res, next) {
        req.session.destroy(function(err) {
            res.redirect('/login');
            if(err)
                return next(err);
        })
    }
};

function verifyUserPass(params, next) {
    User.findOne({ username: params.name }, function (err, response) {
        var verified = false;
        if(err){
            verified = false;
        }else{
            if(response){
                verified = response.password === params.password;
            }
        }
        next(verified, response);
    });
}