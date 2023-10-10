const mongoose = require('mongoose');

const DailyAdkharSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        
    },
    value1: {
        type: String,
       
    },
    value2: {
        type: String,
       
    },
    value3: {
        type: String,
       
    },
    value4: {
        type: String,
       
    },
    number: {
        type: String,
       
    },
});

const DailyAdkhar = mongoose.model('DailyAdkhar', DailyAdkharSchema);
module.exports = DailyAdkhar;