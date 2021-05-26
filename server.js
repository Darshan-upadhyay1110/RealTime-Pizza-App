const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();


app.set("views",path.join(__dirname,'/resources/views'));
app.set("view engine","ejs");


app.get('/',(req,res,next)=>{
    res.render('home');
    
})

app.use(expressLayouts);



const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`I am Server at ${PORT}`);
})