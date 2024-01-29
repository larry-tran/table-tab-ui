const mongoose = require('mongoose');
// const uuid = require('uuid')
const Schema = mongoose.Schema;
let Folder = new Schema(
  {
    name: {
      type: String,
    },
    type: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "Folder" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Folder', Folder);