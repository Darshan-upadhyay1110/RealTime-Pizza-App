const axios = require("axios");
const flash = require("express-flash");
const Noty = require("noty");
const moment = require("moment");

const admin = require("./admin");


let addToCart = document.querySelectorAll(".add-to-cart");
// console.log(addToCart);
let cartRmv = document.querySelectorAll(".cartRmv");
// console.log(cartRmv);
let pizzaCounter = document.getElementById("pizzaCounter");

let updateCart = (cartAddedPizza) => {
  axios
    .post("/update-cart", cartAddedPizza)
    .then((res) => {
      // console.log(res);
      pizzaCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 800,
        text: "Item added to cart",
        progressBar: false,
        //layout:'topLeft'
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false,
      }).show();
    });
};

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log(e);

    let cartPizza = JSON.parse(btn.dataset.pizza);
    // console.log(cartPizza);
    updateCart(cartPizza);
  });
});


let removeFromCart = (cartRemovedPizza) => {
  axios
    .post("/updateRemove-cart", cartRemovedPizza)
    .then((res) => {
      // console.log(res);

      if(res.data.totalPrice == 0 || res.data.totalQty == 0){
        location.href = '/cart';
      }
      console.log(res.data.pqty);
      if(res.data.pqty == 0){
        
        location.reload();
        // res.redirect("/");
        // console.log("reload");
      }
      // console.log(res);


      pizzaCounter.innerText = res.data.totalQty;
      let id = cartRemovedPizza.item._id;
      let id1 = document.getElementById(id);
      
      // console.log(id1);
      // console.log(cartRemovedPizza);
      // console.log(id);
      let id1child = id1.childNodes[0];
      // console.log(id1child);
      id1child.nodeValue = res.data.pqty + " pcs";
      let TotalPrice = document.getElementById("TotalPrice");
      // console.log(TotalPrice);
      TotalPrice.innerText = res.data.TotalPrice;
      let temp = 'TP'+id;
      // console.log(temp);
      let singlePizzaPrice = document.getElementById(temp)
      singlePizzaPrice.innerText = res.data.singlePizzaPrice


      new Noty({
        type: "success",
        timeout: 800,
        text: "Item Removed from cart",
        progressBar: false,
        //layout:'topLeft'
      }).show();
    })
    .catch((err) => {
      console.log(err);
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false,
      }).show();
    });
};
cartRmv.forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    // console.log(e);
    let cartRemvPizza = JSON.parse(btn.dataset.pizzrmv)
    removeFromCart(cartRemvPizza)
    // console.log(cartRemvPizza);
   
    

  })
})
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}


//update status
let statuses = document.querySelectorAll(".status_line");
// console.log(statuses);

let hiddeninput = document.getElementById("hiddenInput");

let order = hiddeninput ? hiddeninput.value : null;
order = JSON.parse(order);
let time = document.createElement("small");
// console.log(JSON.parse(order));

const updateStatus = (order) => {

//removing all clss of color becoz socket problem
statuses.forEach((element)=>{

element.classList.remove('step-completed')
element.classList.remove('current')
})


  //add or remove some class for timeline thing
  let stepCompleted = true;
  statuses.forEach((element) => {
    let dataProp = element.dataset.status;
    if (stepCompleted) {
      element.classList.add("step-completed");
    }
    if (dataProp == order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm A");

      element.appendChild(time)

      if (element.nextElementSibling) {
        element.nextElementSibling.classList.add("current");
      }
    }
  });
};

updateStatus(order);

//   const formObj = document.getElementById('stateSelection')
// document.getElementById('state').addEventListener("change",myfunc);
// function myfunc() {
//   formObj.submit();







//Socket Client Side
let socket = io();
// console.log("init");

 
//join room created for cilent side changes
if(order)
{
    socket.emit('join',`order_${order._id}`)
}
//order_efbgiewubefninfdusiisnx - nameOfScoketRoom on server

let adminPath = window.location.pathname
// console.log(adminPxath);
if(adminPath.includes('admin')){
  admin.initAdmin(socket);
  socket.emit('join','adminRoom');
}




socket.on('orderUpdated',(data)=>{
  const updatedOrder = { ...order }
  updatedOrder.updatedAt = moment().format()
  updatedOrder.status = data.status
  updateStatus(updatedOrder)
  new Noty({
    type: "success",
    timeout: 800,
    text: "Order Updated",
    progressBar: false,
    //layout:'topLeft'
  }).show();
  // console.log(data);
})
