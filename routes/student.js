var express = require('express');
var router = express.Router();
var JSAlert = require("js-alert");

router.get('/studentView', function (req, res, next) {
    res.render('studentView');
    
  });
  
  router.get('/orderSummaryView', function (req, res, next) {
    res.render('sOrderSummary');
    
  });
  router.get('/payFeeView', function (req, res, next) {
    res.render('sPayFee');
    
  });
  router.get('/viewBalanceView', function (req, res, next) {
    res.render('sViewBalance');
    
  });

  router.post('/login', function(req, res, next) {
 
    data = req.body;
    SFTS.methods.studentLogin(data.sAddress)
        .call({ from: coinbase }).then((val) => {
           
          val= web3.utils.toBN(val).toString();
          if(val == 1){
            web3.eth.personal.unlockAccount(data.sAddress, data.sPassword, 1000)
            .then((response) => {
                if(response){
                // sessionStorage.clear();
                // sdata = "Hospital";
                // sessionStorage.setItem("User",sdata);
                    res.redirect('/student/studentView')
                }    
                console.log(response);
            }).catch((error) => {
  
                res.redirect('/student/sLoginView')
                console.log("Password You Entered is wrong")
  
                // console.log(error);
            });
          }else{
              res.redirect('/student/sLoginView')
            console.log("Address not found")
          }
           
        }).catch((error) => {
                  console.log(error);
              });
  
   
  });
  router.get('/getOrderSummary', function (req, res, next) {
    data = req.query;
    console.log(data);
    
    SFTS.methods.getFinalOrderSummary(data.orderId)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            
            res.render("sDisplayOrderSummary", {getOrderSummaryData : val});
        })
        
        
});

router.post('/payToManagement', function (req, res, next) {
  data = req.body;
  console.log(data);
  data.amount=web3.utils.toWei(data.amount,'ether');
  
  SFTS.methods.feePayment(data.roll,data.amount).send({ from: data.sAddress, value: data.amount, gas: 600000 });
  res.send("Paid to Management!");


  web3.eth.sendTransaction({from: data.sAddress,to:data.mAddress,value: data.amount});
});


router.get('/displayBalance', function (req, res, next) {
  data = req.query;
  console.log(data);
  
  web3.eth.getBalance(data.sAddress).then((val)=>{
    var bal = web3.utils.fromWei(val,'ether');
    console.log(bal);
    res.render("sDisplayBalance",{balance:bal});
   
  })
     
});


module.exports = router;