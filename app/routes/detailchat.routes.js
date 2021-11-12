module.exports = (app) => {
    const details = require('../controllers/detailchat.controller.js');

    // Create a new Note
    app.post('/details', details.create);

    // Retrieve all details
    app.get('/details', details.findAll);

    // Retrieve a single Note with noteId
    app.get('/details/id/:chatid', details.findOne);

    // Retrieve a single Note with noteId
    app.get('/details/sender/:sender', details.findOnebySender);

    // Delete Chat
    app.delete('/details/:detchatId', details.delete)

    // Update Chat
    app.put('/details/:detchatId', details.update)
}