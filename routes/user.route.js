const userModel = require("../models/user.model");
const { BAD_REQUEST } = require("http-status");
const jwt = require("jsonwebtoken");
const express = require('express');
const bcrypt = require("bcrypt");
const userRoutes = express.Router();
const dotenv = require("dotenv");
const auth = require('../middleware/jwt_auth');

dotenv.config();

// userRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     userModel.findById(id).then(data=>{
//         res.json(data);
//     }).catch(err=>{
//         console.log(err);
//     })
// });

userRoutes.route("/login").post(function (req, res) {
  const { name, password } = req.body;
  try {
    userModel
      .findOne({ name })
      .then((data) => {
        if (data) {
          if (comparePassword(password, data.password)) {
            const token = jwt.sign(
              { userId: data._id.toHexString() },
              process.env.JWT_SECRET_KEY || "larry"
            );
            res.json({ token, userId: data._id.toHexString(), name: data.name});
          } else {
            res.status(BAD_REQUEST).json({ msg: "Wrong password" });
          }
        } else {
          res.status(BAD_REQUEST).json({ msg: "User does not exist" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(BAD_REQUEST).json({ msg: "User is not found" });
  }
});

userRoutes.route('/add').post(function(req, res) {
    const {name, password} = req.body;
    const hashPass = hashPassword(password);
    let user = new userModel({name, password: hashPass});
    user.save()
    .then(data => {
        res.json('Create successfully');
    })
    .catch(err => {
        res.status(400).send('adding new user failed ', err);
    });
});

userRoutes.use(auth).route('/get').get(function(req, res) {
  console.log(req.user);
    res.json(req.user);
});

const comparePassword = (raw, hashed) => {
	return bcrypt.compareSync(raw, hashed);
};

const hashPassword = (raw) => {
	return bcrypt.hashSync(raw, salt);
};

// Generate a salt with 10 rounds
const salt = bcrypt.genSaltSync(10);

module.exports = userRoutes;