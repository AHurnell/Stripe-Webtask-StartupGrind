//import stripe latest version
var stripe = require('stripe@4.14.0');

module.exports = function(ctx, cb) {
  
  //Call stripe to pay an order
  //Pass order ID and stripe credit card token (POST variables)
  stripe(ctx.secrets.stripe_private_api_key).orders.pay(ctx.body.order, {
    source: ctx.body.token
    
  }, function(err, paid_order){
    //called asynchronously
    //returns the result of the stripe payment process
    cb(null, { paid_order: paid_order || err });
  });
  
};