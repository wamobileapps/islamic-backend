const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const QuranNotesSchema = new mongoose.Schema({

    user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    page_id: {
        type: Number,
    },

    description: {

        type: String
    },
    language: {
        type:String,
        
    },

    date: {
        type: Date,
        default: Date.now

    },
})

module.exports = mongoose.model('QuranNotes', QuranNotesSchema)