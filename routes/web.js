const express = require('express');
const authController = require('../App/http/controllers/authController');
const homeController = require('../App/http/controllers/homeController');
const cartController = require('../App/http/controllers/customers/cartController');
const isAuth = require('../App/http/middlewares/auth');

const route = express.Router();


route.get('/',homeController.homePage);

route.get('/login',isAuth.auth,authController.getLogin);
route.post('/login',authController.postLogin);
route.post('/logout',authController.postLogout);

route.get('/register',isAuth.auth,authController.getRegister);
route.post('/register',authController.postRegister);


route.get('/cart',cartController.getCart);
route.post('/update-cart',cartController.updateCart);



module.exports = route;