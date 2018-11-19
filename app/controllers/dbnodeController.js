/**
 * Created by Rajesh on 11/19/18.
 */

var url = require('url');
var DBNode = require('../models/dbnode');

module.exports = {

    create: function (req, res, next) {
        var params = req.body;

        var dbObject = new DBNode({
            dbName : params.name,
            dbUser : params.user,
            dbPassword : params.password ? params.password : '',
            dbHost : params.host,
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
