const Chat = require('../models/chat.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const chat = new Chat({
        msg: req.body.msg,
        msg2: req.body.msg2,
        userid: req.body.userid  
    });

    // Save Note in the database
    chat.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Chat.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Chat.findById(req.params.msgId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.msgId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.msgId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.msgId
        });
    });
};

// Find a single note with a noteId
exports.findOneChat = (req, res) => {
    const id = req.params.userid
    Chat.find({"userid" : id})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.userid
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userid
        });
    });
};

// // Find a single note with a noteId
// exports.findId = (req, res) => {
//     User.findById(req.params.userId)
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });            
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving user with id " + req.params.userId
//         });
//     });
// };