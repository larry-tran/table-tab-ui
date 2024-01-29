const mongoose = require('mongoose');
// const uuid = require('uuid')
const Schema = mongoose.Schema;
let Note = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    fileId: { type: Schema.Types.ObjectId, ref: 'File' },
},{
    timestamps: true,
});
module.exports = mongoose.model('Note', Note);