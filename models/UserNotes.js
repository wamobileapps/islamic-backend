const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserNotes = new mongoose.Schema({
    page_id: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    textColor: {
        type: String,
        required: true
    },
   

    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('UserNotes', UserNotes)