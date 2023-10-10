const mongoose = require('mongoose');

const familyTreeNewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('FamilyTreeNew', familyTreeNewSchema);
