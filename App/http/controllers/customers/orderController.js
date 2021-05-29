const Order = require("../../../models/order");
const moment = require('moment')


exports.postOrder = (req, res, next) => {
  // console.log(req.body);
  const { phone, address } = req.body;
  if (!phone || !address) {
    req.flash("error", "All Fields Are Required");
    return res.redirect("/cart");
  }
  const order = new Order({
    customerId: req.user._id,
    items: req.session.cart.items,
    phone: phone,
    address: address,
  });

  order
    .save()
    .then((result) => {
      req.flash("success", "Order Placed Successfull");
      delete req.session.cart;
      return res.redirect("/customer/orders");
    })
    .catch((err) => {
      req.flash("error", "somthing Went Wrong");
      return res.redirect("/cart");
    });
};

exports.getCustomerOrders = async (req, res, next) => {
  const orders = await Order.find({ customerId: req.user._id }, null,
    { sort: { 'createdAt': -1 } } )
  console.log(orders);
  res.render('customers/orders', { orders: orders, moment: moment })
  
};
