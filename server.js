const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Assets Config
app.use(express.static('public'));

//route
app.get('/',(req,res,next)=>{
    res.render('home');
    
})

//Set Templet Engine
app.use(expressLayouts);
app.set("views",path.join(__dirname,'/resources/views'));
app.set("view engine","ejs");




const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`I am Server at ${PORT}`);
})