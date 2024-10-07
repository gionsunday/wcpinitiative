const Paystack = require('paystack')('sk_test_adfef8710c254d21f58cd93243f2ea79efb9c3ee');



const paystackPayment = (req, res)=>{
    const {email, amount} = req.body
Paystack.transaction.initialize({
    email: email,
    amount: amount // in kobo
  }).then(function(body){
    // send the authorization_url in the response to the client to redirect them to
    // the payment page where they can make the payment
    res.send(body.data.authorization_url);
  });

}
module.exports = {paystackPayment}