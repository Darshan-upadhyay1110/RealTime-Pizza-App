require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session")
const flash = require('express-flash');
const MongoDbStore = require('connect-mongodb-session')(session);

const app = express();



// Database connection
const MONGODB_URI = 'mongodb+srv://Darshan_1110:Darshan1110@cluster0.r1wui.mongodb.net/Pizza';

//session store in db
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

//sessionconfig
app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  store:store,
  saveUninitialized:false,
  cookie:{maxAge:1000*60*60*24}//24 hr
}));

//setting cookie
app.use(flash());

// Assets Config
app.use(express.static("public"));
app.use(express.json());

//globalMiddelware
app.use((req,res,next)=>{

  res.locals.session = req.session;
  next();

})

//Set Templet Engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//route
const webroutes = require("./routes/web");
app.use(webroutes);

const PORT = process.env.PORT || 3000;




mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => {
        console.log(`I am Server at ${PORT}`);
      });
  })
  .catch((err) => {
    console.log(err);
  });