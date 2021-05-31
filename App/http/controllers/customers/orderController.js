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

      Order.populate(result,{path:'customerId'},(err,placedOrder)=>{
        req.flash("success", "Order Placed Successfull");
        delete req.session.cart;
        //Emit
  
        const eventEmmiter  = req.app.get('eventEmmiter')
        eventEmmiter.emit('orderPlaced',placedOrder)
        return res.redirect("/customer/orders");
      }) 
     
    })
    .catch((err) => {
      req.flash("error", "somthing Went Wrong");
      return res.redirect("/cart");
    });
};

exports.getCustomerOrders = async (req, res, next) => {
  const orders = await Order.find({ customerId: req.user._id }, null,
    { sort: { 'createdAt': -1 } } )
  // console.log(orders);
  res.header('Cache-Control','no-cache,private,no-store,must-revalidate,pre-check=0,post-check=0,max-stale=0')
  res.render('customers/orders', { orders: orders, moment: moment })
  
};


exports.getStatusOfPizza = async (req,res,next)=>{
  // console.log(req.params.id);

  const order = await Order.findById(req.params.id) 
  //auth of login user only can see there status

  if(req.user._id.toString() === order.customerId.toString()){
    return res.render('customers/pizzaStatus',{order:order})

  }
  return res.redirect('/')
}