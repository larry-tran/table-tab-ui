const mongoose = require('mongoose');
// const uuid = require('uuid')
const Schema = mongoose.Schema;
let User = new Schema(
  {
    __id: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', User);