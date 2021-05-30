const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require('passport');

exports.getLogin = (req, res, next) => {
  res.render("Auth/login");
};
exports.postLogin = (req, res, next) => {
    const { email, password } = req.body
    // Validate request 
     if(!email || !password) {
         req.flash('error', 'All fields are required')
         return res.redirect('/login')
     }
     passport.authenticate('local', (err, user, info) => {
         if(err) {
             req.flash('error', info.message )
             return next(err)
         }
         if(!user) {
             req.flash('error', info.message )
             return res.redirect('/login')
         }
         req.logIn(user, (err) => {
             if(err) {
                 req.flash('error', info.message ) 
                 return next(err)
             }
             if(req.user.role === 'admin')
             {
               console.log("really fuck");
               return res.redirect('/admin/orders');
             }
             console.log("really fuck custbro");
             return res.redirect('/customer/orders')
         })
     })(req, res, next)
  
};

exports.postLogout = (req, res)=> {
    req.logout()
    return res.redirect('/login')  
  }

exports.getRegister = (req, res, next) => {
  res.render("Auth/register");
};

exports.postRegister = async (req, res, next) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    req.flash("error", "All fields required");
    req.flash("name", name);
    req.flash("email", email);
    return res.redirect("/register");
  }
  //Unique Email varification
  User.exists({ email: email }, (err, result) => {
    if (result) {
      req.flash("error", "Email already Exists");
      req.flash("name", name);
      req.flash("email", email);
      return res.redirect("/register");
    }
  });

  //hashing password
  const hashedPassword = await bcrypt.hash(password, 10);
//   console.log(hashedPassword);

  //storing User in db
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
//   console.log(user);
  user
    .save()
    .then((user) => {
      return res.redirect("/");
    })
    .catch((err) => {
        console.log(err);
      req.flash("error", "Something Went Wrong");
      return res.redirect("/register");
    });
}
