const mongoose = require("mongoose");
var Schema = mongoose.Schema; 
const FamilyGroupScheema = new mongoose.Schema({
    userId:{
        type: Schema.ObjectId,
        ref :"User"
    },
    status:{
   type:String
    },
    creator:{
        type: Schema.ObjectId,
        ref :"User"
    }
});
module.exports = mongoose.model('FamilyGroup', FamilyGroupScheema )