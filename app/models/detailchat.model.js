const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const DetailChatSchema = mongoose.Schema({
    chatid: {type: ObjectId, ref:'chat.model'},
    body: String,
    sender: {type: ObjectId, ref:'user.model'},
}, {
    timestamps: true
});

module.exports = mongoose.model('DetChat', DetailChatSchema);
