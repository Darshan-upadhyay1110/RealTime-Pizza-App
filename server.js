require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session")
const flash = require('express-flash');
const MongoDbStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const Emmiter = require('events')
const helmet = require('helmet');
const compression = require('compression');

const app = express();

 //for safe heders
//  app.use(helmet())
 app.use(compression());

// Database connection




//session store in db
const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

//event Emmiter
let eventEmmiter = new Emmiter()
app.set('eventEmmiter',eventEmmiter);


//sessionconfig
app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  store:store,
  saveUninitialized:false,
  cookie:{maxAge:1000*60*60*24}//24 hr
}));

// passport init
const passportInit = require('./App/config/passport');
passportInit.init(passport);
app.use(passport.initialize());
app.use(passport.session());

//setting cookie
app.use(flash());

// Assets Config
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//globalMiddelware
app.use((req,res,next)=>{

  res.locals.session = req.session;
  res.locals.user = req.user
  // console.log(req.user);
  next();

})

//Set Templet Engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//route
const webroutes = require("./routes/web");
app.use(webroutes);
app.use((req,res)=>{
  res.status(404).render('errors/404');
})

const PORT = process.env.PORT || 3000;




mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
   const server =  app.listen(PORT, () => {
        console.log(`I am Server at ${PORT}`);
      });
      const io = require('socket.io')(server);
      io.on('connection', socket => {  
        // console.log('connected');
        // console.log(socket.id);
        socket.on('join',(orderId)=>{
          // console.log(orderId);
          socket.join(orderId);
        })
      })

      eventEmmiter.on('orderUpdated',(data)=>{
        io.to(`order_${data.id}`).emit('orderUpdated',data)

      })
      eventEmmiter.on('orderPlaced',(data)=>{
        io.to(`adminRoom`).emit('orderPlaced',data)

      })
  })
  .catch((err) => {
    console.log(err);
  });