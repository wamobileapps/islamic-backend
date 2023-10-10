const mongoose = require('mongoose');

const LanguagesSchema = new mongoose.Schema({
    
    language: {
        type: String,
        require:true
    }


})

module.exports = mongoose.model('Languages', LanguagesSchema)