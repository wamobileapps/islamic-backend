const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserInfoForMajor = new mongoose.Schema({
    info: [],
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('UserInfoForMajor', UserInfoForMajor)