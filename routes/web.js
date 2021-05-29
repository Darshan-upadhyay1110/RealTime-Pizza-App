const express = require('express');
const authController = require('../App/http/controllers/authController');
const homeController = require('../App/http/controllers/homeController');
const cartController = require('../App/http/controllers/customers/cartController');
const orderController = require('../App/http/controllers/customers/orderController')
const adminOrderController = require('../App/http/controllers/admin/orderController');

const isGuest = require('../App/http/middlewares/guest');
const isAuth = require('../App/http/middlewares/auth');

const route = express.Router();


route.get('/',homeController.homePage);

route.get('/login',isGuest.auth,authController.getLogin);
route.post('/login',authController.postLogin);
route.post('/logout',authController.postLogout);

route.get('/register',isGuest.auth,authController.getRegister);
route.post('/register',authController.postRegister);


route.get('/cart',cartController.getCart);
route.post('/update-cart',cartController.updateCart);


//customer routes
route.post('/order',isAuth.auth,orderController.postOrder);
route.get('/customer/orders',isAuth.auth,orderController.getCustomerOrders)

//admin routes
route.get('/admin/orders',isAuth.auth,adminOrderController.getAdminOrders);

module.exports = route;