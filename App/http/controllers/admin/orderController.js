const Order = require('../../../models/order');

exports.getAdminOrders = (req,res,next)=>{
    const orders =  Order.find({ status : {$ne: 'completed'}},null,{sort:{'createdAt':-1}})
    .populate('customerId','-password').exec((err,result)=>{
        // console.log(result);
        if(req.xhr)
        {
            // console.log("ajex");
            // console.log(result,"heeekei");
            return res.json(result);
        }
        else{
            // console.log("should");
            return res.render('admin/orders')
        }
        
    })
    
}

exports.postUpdateStatusAdmin = (req,res,next)=>{

        Order.updateOne({_id:req.body.orderId},{ status:req.body.status },(err,data)=>{
            if(err){
                return res.redirect('/admin/orders')
            }
            //send emmit event
            const eventEmmiter = req.app.get('eventEmmiter');
            eventEmmiter.emit('orderUpdated',{id:req.body.orderId , status:req.body.status})
           return res.redirect('/admin/orders')
        })

}