const noteModel = require("../models/note.model");
const auth = require('../middleware/jwt_auth');

const express = require('express');
const noteRoutes = express.Router();

noteRoutes.use(auth);

// noteRoutes.route('/').get(function(req, res) {
//     noteModel.find().then(data=>{
//         res.json(data);
//     }).catch(err=>{
//         console.log(err);
//     })
// });

noteRoutes.route('/file/:id').get(function(req, res) {
    let id = req.params.id;
    noteModel.find({fileId: id}).then(data=>{
        res.json(data);
    }).catch(err=>{
        console.log(err);
    })
});

noteRoutes.route('/add').post(function(req, res) {
    let note = new noteModel(req.body);
    note.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).send('adding new note failed ', err);
    });
});

noteRoutes.route('/adds').post(function(req, res) {
    let notes = req.body;
    noteModel.insertMany(notes)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).send('adding new note failed ', err);
    });
});

noteRoutes.route('/').put(function(req, res) {
    let note = req.body;
    noteModel.findByIdAndUpdate(note._id, note, {new: true})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).send('Update note failed ', err);
    });
});


noteRoutes.route('/:noteId').delete(function(req, res) {
    let noteId = req.params.noteId;
    noteModel.findByIdAndRemove(noteId)
    .then(() => {
        res.json('Removed');
    })
    .catch(err => {
        res.status(400).send('Update file failed ', err);
    });
});
module.exports = noteRoutes;