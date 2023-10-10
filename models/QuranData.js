const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const QuranSchema = new mongoose.Schema({
    userId:{
        type: Schema.ObjectId,
        ref:'User',
    },
    quranData:{
        page:Number,
        data:[],
        createdAt:{
            type:Date,
           default:Date.now
        },
        totalChapter:Number
    },
    date:{
        type:Date,
       default:Date.now
    },
});

module.exports = mongoose.model('Quran',QuranSchema)