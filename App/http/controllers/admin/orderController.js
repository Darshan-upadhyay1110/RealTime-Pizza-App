const Order = require('../../../models/order');

exports.getAdminOrders = (req,res,next)=>{
    const orders =  Order.find({ status : {$ne: 'completed'}},null,{sort:{'createdAt':-1}})
    .populate('customerId','-password').exec((err,result)=>{
        // console.log(result);
        if(req.xhr)
        {
            // console.log("ajex");
            // console.log(orders);
            return res.json(result);
        }
        else{
            // console.log("should");
            return res.render('admin/orders')
        }
        
    })
    
}