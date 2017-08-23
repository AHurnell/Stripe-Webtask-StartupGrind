//import stripe latest version
var stripe = require('stripe@4.14.0');


module.exports = function(ctx, cb) {

//Call stripe API with a new order
stripe(ctx.secrets.stripe_private_api_key).orders.create({
  currency: 'gbp',
  email: ctx.body.email,
  metadata: {
    phone: ctx.body.phone
  },
  items: [
    {
      type: 'sku',
      parent: ctx.body.product,
      quantity: ctx.body.quantity,
    }
    ],
  shipping: {
    name: ctx.body.name,
    address: {
      line1: ctx.body.address
    }
  }  
},function(err,order){
  //return a new order stripe's object created
  //asynchronously called
    cb(null, { order: order || err });

});
};