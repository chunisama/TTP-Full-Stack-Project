const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys.js').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");
const env = require('dotenv').config();

mongoose
  .connect(db, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Test
// app.get("/", (req, res) => {
//   // console.log(res);
//   // debugger;
//   res.send("Hello World");
// });

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
