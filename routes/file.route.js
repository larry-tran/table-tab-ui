const fileModel = require("../models/file.model");
const noteModel = require("../models/note.model");

const auth = require('../middleware/jwt_auth');
const express = require('express');
const fileRoutes = express.Router();

fileRoutes.use(auth);


fileRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    fileModel.findById(id).populate('parentId').then(data=>{
        res.json(data);
    }).catch(err=>{
        console.log(err);
    })
});

fileRoutes.route('/').post(function(req, res) {
    fileModel.find(req.body).then(data=>{
        res.json(data);
    }).catch(err=>{
        console.log(err);
    })
});

// fileRoutes.route('/file/:id').get(function(req, res) {
//     let id = req.params.id;
//     fileModel.find(id).then(data=>{
//         res.json(data);
//     }).catch(err=>{
//         console.log(err);
//     })
// });

fileRoutes.route('/add').post(function(req, res) {
    let file = new fileModel(req.body);
    file.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).send('adding new file failed ', err);
    });
});

fileRoutes.route('/').put(function(req, res) {
    let file = req.body;
    fileModel.findByIdAndUpdate(file._id, file, {new: true})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).send('Update file failed ', err);
    });
});

fileRoutes.route("/:fileId").delete(async (req, res) => {
  try {
    let fileId = req.params.fileId;

    const files = await fileModel.findOne({parentId: fileId});
    const notes = await noteModel.findOne({fileId});
    if(files == null && notes == null){
        const remove = await fileModel.findByIdAndRemove(fileId);
        res.json('Removed');
    }else{
        res.status(503).send({msg:'Remove child file or child note first'});
    }

    // fileModel.findByIdAndRemove(fileId)
    // .then(() => {
    //     res.json('Removed');
    // })
    // .catch(err => {
    //     res.status(400).send('Update file failed ', err);
    // });
  } catch (error) {
    res.status(500).send({msg: 'Remove failed ' + err});
  }
});

module.exports = fileRoutes;