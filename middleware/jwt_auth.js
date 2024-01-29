const { BAD_REQUEST } = require("http-status");
const jwt = require("jsonwebtoken");
const userModel = require('../models/user.model');
const dotenv = require("dotenv");
dotenv.config();

const userAuth = async (req, res, next) => {
    try {
      // if (!req.headers.authorization) throw new Error();
      const token = req.headers.authorization.split(" ")[1];
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY || "larry");
      // console.log("data", data);
      const user = await userModel.findById(data.userId);
      if (user === null) throw new Error();
      req.user = {id: user.id, name: user.name};
      next();
    } catch (err) {
      res
        .status(BAD_REQUEST)
        .json({ error: "Authentication Error" });
    }
  };

  module.exports = userAuth;