const mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var UseTypeSchema = new mongoose.Schema({
    name: String,
   
  });
  module.exports = mongoose.model('UserType', UseTypeSchema )