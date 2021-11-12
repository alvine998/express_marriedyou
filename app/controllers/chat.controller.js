const Chat = require('../models/chat.model.js');
const mongoose = require('mongoose')

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const chat = new Chat({
        msg: req.body.msg,
        msg2: req.body.msg2,
        userid: req.body.userid,
        targetid: req.body.targetid,
        detchatid: req.body.targetid        
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

// Create and Save a new Note
exports.createSend = async(req, res) => {
    Chat.findByIdAndUpdate(req.params.msgId,
        // nama: req.body.nama, 
        // email: req.body.email,
        // nohp: req.body.nohp,
        // password: bcrypt.hashSync(req.body.password, 8)
        
        {$push: {msg : req.body.msg, msg2: req.body.msg2}}
    , {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.msgId
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
            message: "Error updating user with id " + req.params.msgId
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
exports.findOne = async(req, res) => {
    await Chat.aggregate(
        [
            {$match: {_id: mongoose.Types.ObjectId(req.params.msgId)}},
            {
                $lookup: {
                    from: "customers",
                    localField:"userid",
                    foreignField: "_id",
                    as : "users",
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField:"targetid",
                    foreignField: "_id",
                    as : "users_target",
                }
            },
            {
                $project :{
                    userid: 0,
                }
            },
            {
                $project :{
                    targetid: 0,
                }
            },
            {$sort : {_id: 1}},
        ],
        [
            {$match: {_id: mongoose.Types.ObjectId(req.params.msgId)}},
            {
                $lookup: {
                    from: "customers",
                    localField:"targetid",
                    foreignField: "_id",
                    as : "users_target",
                },
            },
            {
                $project :{
                    targetid: 0,
                },
            },
            {$sort : {_id: 1}},
        ],
        function (err,data){
            if(err || data == null){
                res.json({
                    msg: "Gagal dapat data",
                    err
                });
            } else {
                res.json(data[0])
            }
        }
    )
};

// Find a single note with a noteId
exports.findOneChat = async(req, res) => {

    await Chat.aggregate(
        [
            {$match: {userid: mongoose.Types.ObjectId(req.params.userid)}},
            {
                $lookup: {
                    from: "customers",
                    localField:"userid",
                    foreignField: "_id",
                    as : "users",
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField:"targetid",
                    foreignField: "_id",
                    as : "users_target",
                }
            },
            {
                $lookup: {
                    from: "detchats",
                    localField:"detchatid",
                    foreignField: "_id",
                    as : "detail",
                }
            },
            {
                $project :{
                    userid: 0,
                }
            },
            {
                $project :{
                    targetid: 0,
                }
            },
            {
                $project :{
                    detchatid: 0,
                }
            },
            {$sort : {userid: 1,createdAt:-1}},
        ],
        [
            {$match: {userid: mongoose.Types.ObjectId(req.params.userid)}},
            {
                $lookup: {
                    from: "customers",
                    localField:"targetid",
                    foreignField: "_id",
                    as : "users_target",
                },
            },
            {
                $project :{
                    targetid: 0,
                },
            },
            {$sort : {userid: 1, createdAt:-1}},
        ],
        function (err,data){
            if(err || data == null){
                res.json({
                    msg: "Gagal dapat data",
                    err
                });
            } else {
                res.json(data)
            }
        }
    )
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

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Chat.findByIdAndUpdate(req.params.msgId,
        // nama: req.body.nama, 
        // email: req.body.email,
        // nohp: req.body.nohp,
        // password: bcrypt.hashSync(req.body.password, 8)
        req.body 
    , {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.msgId
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
            message: "Error updating user with id " + req.params.msgId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Chat.findByIdAndRemove(req.params.msgId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.msgId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.msgId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.msgId
        });
    });
};