const axios = require('axios');
const Noty = require('noty')

let addToCart = document.querySelectorAll('.add-to-cart');
// console.log(addToCart);
let pizzaCounter = document.getElementById('pizzaCounter');


let updateCart = (cartAddedPizza)=>{
    axios.post('/update-cart',cartAddedPizza).then(res=>{
        // console.log(res);
        pizzaCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 800,
            text: 'Item added to cart',
            progressBar: false,
            //layout:'topLeft'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
}


addToCart.forEach((btn) => {
    btn.addEventListener('click',(e)=>{
        // console.log(e);
        
        let cartPizza =JSON.parse(btn.dataset.pizza);
        // console.log(cartPizza);
        updateCart(cartPizza);
    })
});

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}