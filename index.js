const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require("serve-favicon");
const path = require("path");
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note.route');
// const folderRoutes = require('./routes/folder.route');
const userRoutes = require('./routes/user.route');
const fileRoutes = require('./routes/file.route');
const router = express.Router();

require("dotenv").config({ path: "./config.env" });

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://larrytran49:larrytran49@larrytran.gdyab.mongodb.net/advance_tool?retryWrites=true&w=majority'
app.use(cors());
app.use(bodyParser.json());
app.use(favicon(__dirname + "/public/www/favicon.ico"));
// mongoose
//   .connect(MONGO_URL)
//   .then(() => console.log("DB is ready"))
//   .catch((err) => console.log(err));

app.use('/api/notes', noteRoutes);
// app.use('/folders', folderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on Port: 3000");
});

router.use(
  express.static(
    path.join(
      __dirname,
      process.env["base-dir"] ? process.env["base-dir"] : "./public/www"
    )
  )
);

app.use("/", router);
module.exports = app;

