/**
 * Created by Rajesh on 11/14/18.
 */

var User = require('../models/users');

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
                    req.session.user = response.username;
                    req.session.id = response._id;
                    req.session.level = response.level;
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