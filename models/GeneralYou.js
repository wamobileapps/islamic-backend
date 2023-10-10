const mongoose = require('mongoose');

const GeneralSchema = new mongoose.Schema({
    data:[],
    user_id:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
       default:Date.now
    },
    updated_at:{
        type:Date,
       default:Date.now
    },
});

module.exports = mongoose.model('General',GeneralSchema)