const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Assets Config
app.use(express.static('public'));



//Set Templet Engine
app.use(expressLayouts);
app.set("views",path.join(__dirname,'/resources/views'));
app.set("view engine","ejs");

//route
app.get('/',(req,res,next)=>{
    res.render('home');
    
})
app.get('/cart',(req,res,next)=>{
    res.render('customers/cart');
    
})

app.get('/login',(req,res,next)=>{
    res.render('Auth/login');
    
})

app.get('/register',(req,res,next)=>{
    res.render('Auth/register');
    
})


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`I am Server at ${PORT}`);
})