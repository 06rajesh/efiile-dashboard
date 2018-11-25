/**
 * Created by Rajesh on 11/18/18.
 */
var url = require('url');
var User = require('../models/users');

module.exports = {

    create: function (req, res, next) {
        var params = req.body;

        var userObject = new User({
            username    : params.user,
            email       : params.email,
            password    : params.password,
            addedBy     : req.session.user._id,
            canAddDB    : params.add_db ? params.add_db : false,
            canAddUser  : params.add_user ? params.add_user : false,
            canAddKey   : params.add_key ? params.add_key : false,
        });

        var error = userObject.validateSync();

        if(error){
            res.json({
                message: error.message,
                success: false,
                status: 400
            });
        }else{
            userObject.save(function(err) {

                if (err){
                    let msg = 'User Could Not Be Saved';
                    if(err.message.indexOf('duplicate key error'))
                        msg = 'Error: Username or Email must be Unique';

                    return errResponse(res, next, err, msg);
                }

                res.json({
                    message: 'User Added Successfully',
                    success: true,
                    status: 200
                });
            });
        }
    },

    getAll: function (req, res, next) {
        User
            .find({})
            .limit(10)
            .sort({ createdAt: -1 })
            .select({ _id: 1, username: 1, email: 1, canAddDB: 1, canAddUser: 1, canAddKey: 1, createdAt: 1})
            .exec(function(err, users){
                if(err){
                    return errResponse(res, next, err, "Error Occured, Users Could Not Be Fetched");
                }else{
                    res.json({
                        data: users,
                        success: true,
                        status: 200
                    });
                }
            });
    },
    
    findByName: function (req, res, next) {
        var url_parts = url.parse(req.url, true);
        var params = url_parts.query;

        User.findOne({ username: params.user }, function (err, response) {
            if(err){
                return errResponse(res, next, err, "Error Occured, User Data Could Not Be Fetched");
            }else{
                if(response){
                    res.json({
                        user: response,
                        success: true,
                        status: 200
                    });
                }else{
                    res.json({
                        message: 'No User Found On That Username',
                        success: true,
                        status: 204
                    });
                }
            }
        });
    },

    deleteById: function (req, res, next) {
        var params = req.body;

        User.findByIdAndRemove({ _id: params.id}, function (err, response) {
            if(err){
                return errResponse(res, next, err);
            }else{
                if(response){
                    res.json({
                        message: `User with name ${response.username} has been deleted`,
                        success: true,
                        status: 200
                    });
                }else{
                    res.json({
                        message: 'No User Found On That Id',
                        success: false,
                        status: 204
                    });
                }
            }
        });
    }
};

function errResponse(res, next, err, msg='An Error Occurred') {
    res.json({
        message: msg,
        success: false,
        status: 400
    });
    return next(err);
}
