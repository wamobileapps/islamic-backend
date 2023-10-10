const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const BookmarkSchema = new mongoose.Schema({
    user: {
        type: String,
     
        
    },
    bookmark:[],
    created_at:{
        type:Date,
       default:Date.now
    },
    updated_at:{
        type:Date,
       default:Date.now
    },
});

module.exports = mongoose.model('Bookmark',BookmarkSchema)