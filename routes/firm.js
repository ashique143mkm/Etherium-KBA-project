var express = require('express');
var router = express.Router();
router.get('/firmView', function (req, res, next) {
    res.render('firmView');
    
  });

  router.get('/getOrderDetailsView', function (req, res, next) {
    res.render('fGetOrderDetails');
    
  });
  router.get('/withdrawPaymentView', function (req, res, next) {
    res.render('fWithdrawPayment');
    
  });
  router.get('/fLoginView', function (req, res, next) {
    res.render('fLogin');
    
  });
  router.get('/viewBalanceView', function (req, res, next) {
    res.render('fViewBalance');
    
  });
  

  router.get('/getOrderDetails', function (req, res, next) {
    data = req.query;
    console.log(data);
    
    SFTS.methods.getOrderDetailsFromSchool(data.orderId)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            // val._rollNumber = web3.utils.toBN(val._rollNumber).toString();
            // val._age = web3.utils.toBN(val._age).toString();
            
            res.render("fDisplayOrderDetails", {getOrderData : val});
        })
        
        
});


router.post('/sendSummaryToSchool', function (req, res, next) {
  data = req.body;
  console.log(data);
  SFTS.methods.sendOrderDetailsToSchool(data.firmAddress,data.orderId, data.priceOfOneUnit,data.totalPrice)
      .send({ from:data.firmAddress, gas : 6000000 });
  res.send("Summary Sent To School!!")
});



router.get('/displayBalance', function (req, res, next) {
  data = req.query;
  console.log(data);
  
  web3.eth.getBalance(data.fAddress).then((val)=>{
    var bal = web3.utils.fromWei(val,'ether');
    console.log(bal);
    res.render("fDisplayBalance",{balance:bal});
   
  })
     
});
router.post('/withdrawPayment', function (req, res, next) {
  data = req.body;
  console.log(data);
  SFTS.methods.firmPaymentWithdraw(data.firmId,data.firmAddress)
      .send({ from: coinbase, gas : 6000000 });
  res.send("Payment Withdrawed Own Account!!")
});

router.post('/login', function(req, res, next) {
 
  data = req.body;
  SFTS.methods.firmLogin(data.fAddress)
      .call({ from: coinbase }).then((val) => {
         
        val= web3.utils.toBN(val).toString();
        if(val == 1){
          web3.eth.personal.unlockAccount(data.fAddress, data.fPassword, 1000)
          .then((response) => {
              if(response){
              // sessionStorage.clear();
              // sdata = "Hospital";
              // sessionStorage.setItem("User",sdata);
                  res.redirect('/firm/firmView')
              }    
              console.log(response);
          }).catch((error) => {

              res.redirect('/firm/fLoginView')
              console.log("Password You Entered is wrong")

              // console.log(error);
          });
        }else{
            res.redirect('/firm/fLoginView')
          console.log("Address not found")
        }
         
      }).catch((error) => {
                console.log(error);
            });

 
});
  module.exports = router;