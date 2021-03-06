const express = require('express');
const authController = require('../App/http/controllers/authController');
const homeController = require('../App/http/controllers/homeController');
const cartController = require('../App/http/controllers/customers/cartController');
const orderController = require('../App/http/controllers/customers/orderController')
const adminOrderController = require('../App/http/controllers/admin/orderController');
const errorController = require('../App/http/controllers/errorController');

//Middelwear for url verificationa nd authantication
const isGuest = require('../App/http/middlewares/guest');
const isAuth = require('../App/http/middlewares/auth');
const adminAuth = require('../App/http/middlewares/adminAut');

const route = express.Router();


route.get('/',homeController.homePage);

route.get('/login',isGuest.auth,authController.getLogin);
route.post('/login',authController.postLogin);
route.post('/logout',authController.postLogout);
route.get('/logout',authController.postLogout);

route.get('/register',isGuest.auth,authController.getRegister);
route.post('/register',authController.postRegister);


route.get('/cart',cartController.getCart);
route.post('/update-cart',cartController.updateCart);
route.post('/updateRemove-cart',cartController.updateRemoveCart);


//customer routes
route.post('/order',isAuth.auth,orderController.postOrder);
route.get('/customer/orders',isAuth.auth,orderController.getCustomerOrders)
route.get('/customer/orders/:id',isAuth.auth,orderController.getStatusOfPizza)

//admin routes
route.get('/admin/orders',adminAuth.auth,adminOrderController.getAdminOrders);
route.post('/admin/order/status',adminAuth.auth,adminOrderController.postUpdateStatusAdmin);

//errors
route.get('/errors/404',errorController.error404);

module.exports = route;