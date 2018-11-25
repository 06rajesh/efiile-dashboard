/**
 * Created by Rajesh on 11/19/18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var dbNodeObject = {
    dbName : { type: String, unique: true, required: [true, 'Please Enter a DBName.'] },
    dbUser : { type: String, required: [true, 'Please Enter DB Username.'] },
    dbPassword : { type: String, required: [true, 'Please Enter DB Password.']},
    dbHost : { type: String, required: [true, 'Please Enter DB Hostname.'] },
    dbPort : { type: String, required: [true, 'Please Enter DB Port.'] },
    enable : { type: Boolean },
    owner  : { type: ObjectId, ref: 'Users'},
    title  : { type: String, required: [true, 'Please Enter DB Title.'] },
};

var dbNodeSchema = new Schema(dbNodeObject, { timestamps : true, collection: 'DBNode' });

var DBNode = mongoose.model('DBNode', dbNodeSchema);

module.exports = DBNode;