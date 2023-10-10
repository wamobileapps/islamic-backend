const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 4,
    },
    text_color: {
        type: String,
        required: true,
    },
    pinned: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Journel', JournalSchema)