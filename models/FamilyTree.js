const mongoose = require('mongoose');

var Schema = mongoose.Schema; 

  
  


const FamilyTreeSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require:true
    },
    middlename: {
        type: String,
        require:true
    },
    lastname: {
        type: String,
        require:true
    },
    gender:{
        type:String,
        required:true,
    },
    profile_image:{
        type:String,
        default:'null'
    },
    anniversary_date:{
        type:String,
     
    },
    death_date:{
        type:String,
       
    },
    birthday:{
        type:Date
    },
    place:{
        type:String,
        required:true,
    },
     isAlive:{
        type:Boolean,
        default:0
    },
    age:{
        type:Number,
    },
    note:{
        type:String,
    },
    parents:{
        type:Array,
   
    },
    relatedTo:{
        type: Schema.ObjectId,
        
    },
    userType:{
        type: Number,
    },
    sequence:{
        type: Number,
    },
    family_id:{
        type: Schema.ObjectId,
      
    },

})
module.exports = mongoose.model('FamilyTree', FamilyTreeSchema )

