/**
 * Created by Rajesh on 11/19/18.
 */

var url = require('url');
//var mysql = require('mysql');
var DBNode = require('../models/dbnode');

module.exports = {

    create: function (req, res, next) {
        var params = req.body;

        var dbObject = new DBNode({
            dbName : params.name,
            dbUser : params.user,
            dbPassword : params.password ? params.password : '',
            dbHost : params.host,
            dbPort : params.port ? params.port : '3306',
            enable : params.enabled ? params.enabled : false,
            title  : params.title,
        });

        var error = dbObject.validateSync();

        if(error){
            res.json({
                message: error.message,
                success: false,
                status: 400
            });
        }else{
            dbObject.save(function(err) {

                if (err){
                    let msg = 'Database Credential Could Not Be Saved';
                    if(err.message.indexOf('duplicate key error'))
                        msg = 'Error: Database Name must be Unique';

                    return errResponse(res, next, err, msg);
                }

                res.json({
                    message: 'Database Credential Added Successfully',
                    success: true,
                    status: 200
                });
            });
        }
    },

    getAll: function (req, res, next) {
        DBNode
            .find({})
            .limit(10)
            .sort({ createdAt: -1 })
            .select({ _id: 1, dbName: 1, dbUser: 1, dbPassword: 1, dbHost:1, dbPort: 1, enable: 1, title: 1, createdAt: 1})
            .exec(function(err, users){
                if(err){
                    return errResponse(res, next, err, "Error Occured, DBNode Could Not Be Fetched");
                }else{
                    res.json({
                        data: users,
                        success: true,
                        status: 200
                    });
                }
            });
    },

    deleteById: function (req, res, next) {
        var params = req.body;

        DBNode.findByIdAndRemove({ _id: params.id}, function (err, response) {
            if(err){
                return errResponse(res, next, err);
            }else{
                if(response){
                    res.json({
                        message: `DBNode with name ${response.dbName} has been deleted`,
                        success: true,
                        status: 200
                    });
                }else{
                    res.json({
                        message: 'No DBNode Found with that Id',
                        success: false,
                        status: 204
                    });
                }
            }
        });
    },

    updateDocument: function (req, res, next) {
        var params = req.body;

        DBNode.findById(params.id, function (err, dbnode) {
           if(err){
               return errResponse(res, next, err);
           }else{
               dbnode.dbName = params.name;
               dbnode.dbUser = params.user;
               dbnode.dbPassword = params.password;
               dbnode.dbHost = params.host;
               dbnode.dbPort = params.port;
               dbnode.enable = params.enabled;
               dbnode.title  = params.title;

               var error = dbnode.validateSync();

               if(error){
                   res.json({
                       message: error.message,
                       success: false,
                       status: 400
                   });
               }else{
                   dbnode.save(function(err) {

                       if (err){
                           let msg = 'Database Credential Could Not Be Saved';
                           if(err.message.indexOf('duplicate key error'))
                               msg = 'Error: Database Name must be Unique';

                           return errResponse(res, next, err, msg);
                       }

                       res.json({
                           message: 'Database Credential Updated Successfully',
                           success: true,
                           status: 200
                       });
                   });
               }
           }
        });

    },

    // checkSqlConnection: function (req, res, next) {
    //     var con = mysql.createConnection({
    //         host: "localhost",
    //         port: '3300',
    //         user: "root",
    //         password: "root"
    //     });
    //
    //
    // }
};

function errResponse(res, next, err, msg='An Error Occurred') {
    res.json({
        message: msg,
        success: false,
        status: 400
    });
    return next(err);
}
