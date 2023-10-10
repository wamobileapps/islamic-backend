const mongoose = require('mongoose');

const UserArraySchema = new mongoose.Schema({
  users: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  user_id:{
    type:String,
    required:true,
},
});

const UserArray = mongoose.model('UserArray', UserArraySchema);
module.exports = UserArray;
