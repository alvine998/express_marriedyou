module.exports = (app) => {
    const chats = require('../controllers/chat.controller.js');

    // Create a new Note
    app.post('/chats', chats.create);

    // Retrieve all chats
    app.get('/chats', chats.findAll);

    // Retrieve a single Note with noteId
    app.get('/chats/user/:userid', chats.findOneChat);

    // Retrieve a single Note with noteId
    app.get('/chats/:msgId', chats.findOne);
}