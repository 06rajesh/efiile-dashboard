/**
 * Created by Rajesh on 11/18/18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

var userObject = {
    username: { type: String, unique: true, required: [true, 'Please Enter a Username.'] },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Invalid'
        },
        required: [true, 'User Email Can Not be Empty!!']
    },
    password: {
        type : String,
        minlength :[4, 'Password Minimum Length should be 6'],
        required : [true, 'User password Must be Strong']
    },
    addedBy: {
        type: ObjectId,
        ref: 'Users'
    },
    canAddDB: {type: Boolean},
    canAddUser: {type: Boolean},
    canAddKey: {type: Boolean},
};

var userSchema = new Schema(userObject, { timestamps : true, collection: 'Users' });

var User = mongoose.model('Users', userSchema);

module.exports = User;