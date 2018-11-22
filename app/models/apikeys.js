/**
 * Created by Rajesh on 11/22/18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var apiKeyObject = {
    key    : {type: String, unique: true, required: [true, 'Please Enter a Valid Key.']},
    enable : {type: Boolean},
    owner  : { type: Schema.Types.ObjectId, ref: 'Users' }
};

var apiKeySchema = new Schema(apiKeyObject, { timestamps : { createdAt: 'createdAt' }, collection: 'ApiKeys' });

var apiKeys = mongoose.model('ApiKeys', apiKeySchema);

module.exports = apiKeys;
