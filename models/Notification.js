const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const NotificationSchema = new mongoose.Schema({
   
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type: Schema.ObjectId,
        ref:  'User',
    },
    isRead:{
        type:Boolean,
        default:0
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

module.exports = mongoose.model('Notification',NotificationSchema)