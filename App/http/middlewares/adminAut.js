exports.auth = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role === "admin")
        {
            return next();
        }
        else{
            return res.redirect('/');
        }
        
    }
    return res.redirect('/');
}