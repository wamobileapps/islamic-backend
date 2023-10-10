const mongoose = require('mongoose');



var Schema = mongoose.Schema; 

var FamilySchema = new mongoose.Schema({
    name: String,
   
  });
  module.exports = mongoose.model('Family', FamilySchema)