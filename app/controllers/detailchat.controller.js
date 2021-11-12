const Detchat = require('../models/detailchat.model.js');
const bcrypt = require('bcryptjs');

// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Note
    const detchat = new Detchat({
        chatid: req.body.chatid, 
        body: req.body.body,
        sender: req.body.sender,
    });

    // Save Note in the database
    detchat.save()
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
    Detchat.find()
    .then(detchats => {
        res.send(detchats);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.search = async (req,res) => {
    try{
        const searchParams = req.query
        console.log(searchParams)
        const detchat = await Detchat.find(searchParams)
        if(!detchat){
            throw Error('error, not found')
        } else {
            res.status(200).json(detchat)
        }
    } catch(err){
        res.status(400).json({msg: err})
    }
}

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Detchat.find({"chatid": req.params.chatid})
    .then(detchats => {
        res.send(detchats);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOnebySender = (req, res) => {
    Detchat.find({sender: req.params.sender})
    .then(detchats => {
        res.send(detchats);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findId = (req, res) => {
    Detchat.findOne({"chatid": req.params.chatId})
    .then(detchat => {
        if(!detchat) {
            return res.status(404).send({
                message: "Detchat not found with id " + req.params.chatId
            });            
        }
        res.send(detchat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "detchat not found with id " + req.params.chatId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving detchat with id " + req.params.chatId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Detchat.findByIdAndUpdate(req.params.detchatId,
        req.body 
    , {new: true})
    .then(detchat => {
        if(!detchat) {
            return res.status(404).send({
                message: "detchat not found with id " + req.params.detchatId
            });
        }
        res.send(detchat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "detchat not found with id " + req.params.detchatId
            });                
        }
        return res.status(500).send({
            message: "Error updating detchat with id " + req.params.detchatId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Detchat.findByIdAndRemove(req.params.detchatId)
    .then(detchat => {
        if(!detchat) {
            return res.status(404).send({
                message: "detchat not found with id " + req.params.detchatId
            });
        }
        res.send({message: "detchat deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "detchat not found with id " + req.params.detchatId
            });                
        }
        return res.status(500).send({
            message: "Could not delete detchat with id " + req.params.detchatId
        });
    });
};