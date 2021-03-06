const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ChatSchema = mongoose.Schema({
    msg: [String],
    msg2: [String],
    userid: {type: ObjectId, ref:'user.model'},
    targetid: {type: ObjectId, ref:'user.model'},
    detchatid: {type: ObjectId, ref:'detailchat.model'},
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);
