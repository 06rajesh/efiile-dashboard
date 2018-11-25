/**
 * Created by Rajesh on 11/22/18.
 */

var url = require('url');
var ApiKey = require('../models/apikeys');

module.exports = {
    create : function (req, res, next) {
        var params = req.body;

        var apiKeyObject = new ApiKey({
            key  : params.key,
            enable : params.enabled ? params.enabled : false,
            owner : req.session.user._id
        });

        var error = apiKeyObject.validateSync();

        if(error){
            res.json({
                message: error.message,
                success: false,
                status: 400
            });
        }else{
            apiKeyObject.save(function(err) {

                if (err){
                    let msg = 'Api Key Could Not Be Saved';
                    if(err.message.indexOf('duplicate key error'))
                        msg = 'Error: Api Key must be Unique';

                    return errResponse(res, next, err, msg);
                }

                res.json({
                    message: 'Api Key Added Successfully',
                    success: true,
                    status: 200
                });
            });
        }
    },

    getAll: function (req, res, next) {
        var url_parts = url.parse(req.url, true);
        var params = url_parts.query;

        ApiKey
            .find({})
            .limit(params.limit ? parseInt(params.limit) : 10)
            .skip(params.offset ? parseInt(params.offset) : 0)
            .sort({ createdAt: -1 })
            .select({ _id: 1, key: 1, enable: 1, createdAt: 1})
            .exec(function(err, keys){
                if(err){
                    return errResponse(res, next, err, "Error Occured, Api Key Could Not Be Fetched");
                }else{
                    res.json({
                        data: keys,
                        success: true,
                        status: 200
                    });
                }
            });
    },

    deleteById: function (req, res, next) {
        var params = req.body;

        ApiKey.findByIdAndRemove({ _id: params.id}, function (err, response) {
            if(err){
                return errResponse(res, next, err);
            }else{
                if(response){
                    res.json({
                        message: `ApiKey ${response.key} has been deleted`,
                        success: true,
                        status: 200
                    });
                }else{
                    res.json({
                        message: 'No ApiKey Found with that Id',
                        success: false,
                        status: 204
                    });
                }
            }
        });
    },

    update: function (req, res, next) {
        var params = req.body;

        ApiKey.findById(params.id, function (err, apikey) {
            if (err) {
                return errResponse(res, next, err);
            } else {
                apikey.enable = params.enabled;

                var error = apikey.validateSync();

                if (error) {
                    res.json({
                        message: error.message,
                        success: false,
                        status: 400
                    });
                } else {
                    apikey.save(function (err) {

                        if (err) {
                            let msg = 'Database Credential Could Not Be Saved';
                            if (err.message.indexOf('duplicate key error'))
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
