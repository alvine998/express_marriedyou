const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    msg: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);
