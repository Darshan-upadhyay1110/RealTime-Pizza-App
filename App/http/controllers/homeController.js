const Menu = require('../../models/menu');


exports.homePage = (req,res,next)=>{
    // console.log(Menu);

    Menu.
    find()
    .then((result)=>{
        // console.log(result);
        // result.forEach(element => {
        //     console.log(element.name);
        // });
        res.render('home',{Pizzas:result});
    }).catch((err)=>{
        console.log(err)
    })
   
}

