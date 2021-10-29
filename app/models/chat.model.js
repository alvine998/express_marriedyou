const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ChatSchema = mongoose.Schema({
    msg: Array,
    msg2:Array,
    userid: {type: ObjectId, ref:'user.model'},
    targetid: {type: ObjectId, ref:'user.model'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);
