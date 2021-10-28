module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const cors = require('cors')

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:emails', users.findOne);

    // Searching by name
    app.get('/search', cors(), users.search)

    app.get('/users/id/:userId', users.findId);

    app.get('/users/gender/laki-laki', users.findGender);
    app.get('/users/gender/perempuan', users.findGender2);


    // Login Email
    app.post('/userss/login', users.loginEmail);

    // Update a Note with noteId
    app.put('/users/:emails', users.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', users.delete);
}