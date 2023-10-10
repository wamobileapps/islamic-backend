const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserInfo = new mongoose.Schema({
    info: [],
    isValid: {
        type: Boolean
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('UserInfo', UserInfo)