var express = require('express');
var router = express.Router();
// var alert = require("alert-node");
// var popup = require('popups');


router.get('/managementView', function (req, res, next) {
    res.render('managementView');
    
  });
  router.get('/addFirmView', function (req, res, next) {
    res.render('mAddFirm');
    
  });
  router.get('/viewFirmView', function (req, res, next) {
    res.render('mViewFirm');
    
  });
  router.get('/payToFirmView', function (req, res, next) {
    res.render('mPayToFirm');
    
  });
  router.get('/withdrawFeeView', function (req, res, next) {
    res.render('mWithdrawFee');
    
  });
  router.get('/orderDetailsView', function (req, res, next) {
    res.render('mOrderDetails');
    
  });
  router.get('/addStudentView', function (req, res, next) {
    res.render('mAddStudent');
    
  });
  router.get('/searchStudentView', function (req, res, next) {
    res.render('mSearchStudent');
    
  });
  router.get('/viewBalanceView', function (req, res, next) {
    res.render('mViewBalance');
    
  });
  router.get('/mLoginView', function (req, res, next) {
    res.render('mLogin');
    
  });
  router.get('/studentFeeDetailsView', function (req, res, next) {
    res.render('mStudentFeeDetails');
    
  });
  router.get('/orderSummary', function (req, res, next) {
    res.render('mOrderSummary');
    
  });
  router.post('/login', function (req, res, next) {
    data = req.body;
    console.log(data);
    data = req.body;
  SFTS.methods.managementLogin(data.mAddress)
      .call({ from: coinbase }).then((val) => {
         
        val= web3.utils.toBN(val).toString();
        if(val == 1){
         res.redirect('/management/managementView')
        }else{
          console.log("Not Management Address")
        }
         
      }).catch((error) => {
                console.log(error);
            })
   
});
  
router.post('/setStudentDetails',  function (req, res, next) {
    data = req.body;
    console.log(data);
    
    // var studentAddress  = await web3.eth.personal.newAccount(data.sPassword);
    // console.log(studentAddress);
    SFTS.methods.setStudent(data.roll,data.sAddress,data.adhaarnum, data.name, data.age, JSON.parse(data.indian), data.gender)
        .send({ from: coinbase, gas : 6000000 });
    res.send('Student Registered !');
});

  
router.get('/getStudentDetails', function (req, res, next) {
    data = req.query;
    console.log(data);
    
    SFTS.methods.getStudent(data.roll)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            val._rollNumber = web3.utils.toBN(val._rollNumber).toString();
            val._age = web3.utils.toBN(val._age).toString();
            
            res.render("mDisplayStudent", {getStudentData : val});
        })
        
        
});

router.post('/addFirm',  function (req, res, next) {
  data = req.body;
  console.log(data);
  // var address  = await web3.eth.personal.newAccount(data.firmPassword);
  // console.log(address);
  SFTS.methods.setFirmDetails(data.firmId,data.firmName,data.firmAddress)
      .send({ from: coinbase, gas : 6000000 });
    res.send("Firm Added!!");
});

router.get('/viewFirm', function (req, res, next) {
  data = req.query;
  console.log(data);
  
  SFTS.methods.getFirmDetails(data.firmId)
      .call({ from: coinbase }).then((val) => {
          console.log(val);
         
          // val._firmId = web3.utils.toBN(val._firmId).toString();
          res.render("mDisplayFirm", {firmData : val});
      })
      
      
});

router.post('/payToFirm', function (req, res, next) {
  data = req.body;
  console.log(data);
  data.amount=web3.utils.toWei(data.amount,'ether');
  
  // SFTS.methods.paymentToFirm(data.firmId,data.firmAddress).send({ from: data.managementAddress, value: data.amount, gas: 600000 });
  res.send("Paid To Firm");
  
  web3.eth.sendTransaction({from: data.managementAddress,to:data.firmAddress,value: data.amount});
});

router.post('/setOrderDetails', function (req, res, next) {
  data = req.body;
  console.log(data);
  SFTS.methods.sendOrderDetailsToFirm(data.firmId,data.orderId,data.productDetails,data.numberOfUnits)
      .send({ from: coinbase, gas : 6000000 });
  res.send("Order Details Sent!");
});



router.get('/feeDetailsSearch', function (req, res, next) {
  data = req.query;
  console.log(data);
  
  SFTS.methods.studentFeeDetails(data.roll)
      .call({ from: coinbase }).then((val) => {
          console.log(val);
         
          
          res.render("mDisplayFeeDetails", {getStudentFeeData : val});
      })
      
      
});

router.get('/getOrderSummary', function (req, res, next) {
  data = req.query;
  console.log(data);
  
  SFTS.methods.getFinalOrderSummary(data.orderId)
      .call({ from: coinbase }).then((val) => {
          console.log(val);
          
          res.render("mDisplayOrderSummary", {getOrderSummaryData : val});
      })
      
      
});

router.get('/displayBalance', function (req, res, next) {
  data = req.query;
  console.log(data);
  
  web3.eth.getBalance(data.mAddress).then((val)=>{
    var bal = web3.utils.fromWei(val,'ether');
    console.log(bal);
    res.render("mDisplayBalance",{balance:bal});
   
  })
     
});
module.exports = router;
