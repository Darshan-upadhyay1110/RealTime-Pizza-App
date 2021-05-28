const express = require('express');
const authController = require('../App/http/controllers/authController');
const homeController = require('../App/http/controllers/homeController');
const cartController = require('../App/http/controllers/customers/cartController');

const route = express.Router();


route.get('/',homeController.homePage);

route.get('/login',authController.getLogin);
route.get('/register',authController.getRegister);



route.get('/cart',cartController.getCart);
route.post('/update-cart',cartController.updateCart);

module.exports = route;