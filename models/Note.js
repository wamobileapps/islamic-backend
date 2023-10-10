const mongoose = require("mongoose");
var Schema = mongoose.Schema; 
const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        
    },
    prayer:{
        type:String,
      
    },
    translation:{
        type:String,
        
    },
    transliteration:{
        type:String,
        
    },
    type:{
        type:String,
       
    },
    arbic:{
        type:String,
       
    },
    user_id:{
        type: Schema.ObjectId,
        ref:  'User',
    },
    date:{
         type:String,
         required:true,
     },
})
module.exports = mongoose.model('Note',NoteSchema)