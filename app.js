const express = require("express");
const app = express();
const mongoose = require('mongoose');
// const db = require('./config/keys.js').mongoURI;
const db = process.env.mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require("./routes/api/users");
const stocks = require("./routes/api/stocks");

mongoose
  .connect(db, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


  
// Test
// app.get("/", (req, res) => {
//   // console.log(res);
//   res.send("Hello World");
// });

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, "/frontend/"))); 

/*React root*/ 
app.get("*", (req, res) => { 
  return res.sendFile(path.join(__dirname, "/frontend/public/index.html")); 
});

app.use("/api/users", users);
app.use("/api/stocks", stocks);