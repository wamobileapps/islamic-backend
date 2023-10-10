const mongoose = require('mongoose');
var Schema = mongoose.Schema; 
const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    description:{
        type:String,
        required:true,
        min:4,
    },
   date:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:false
    },
    user_id:{
        type: Schema.ObjectId,
        ref:  'User',
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

module.exports = mongoose.model('Todo',TodoSchema)