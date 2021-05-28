exports.getLogin = (req,res,next)=>{
    res.render('Auth/login');
}
exports.getRegister = (req,res,next)=>{
    res.render('Auth/register');
}


