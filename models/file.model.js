const mongoose = require('mongoose');
// const uuid = require('uuid')
const Schema = mongoose.Schema;
let File = new Schema({
    name: {
        type: String
    },
    isFolder: { type: Boolean },
    parentId: { type: Schema.Types.ObjectId, ref: "File" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
},{
    timestamps: true,
});
module.exports = mongoose.model('File', File);