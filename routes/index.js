var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/studentRegistration', function (req, res, next) {
  res.render('studentRegistration');

});
router.get('/searchStudent', function (req, res, next) {
  res.render('searchStudent');
  
});
router.get('/feePayment', function (req, res, next) {
  res.render('payFees');
  
});
router.get('/studentFeeDetails', function (req, res, next) {
  res.render('studentFeeDetails');
  
});
router.get('/getStudentFeeDetails', function (req, res, next) {
  res.render('displayStudentFeeDetails');
  
});
router.get('/firmView', function (req, res, next) {
  res.render('firmView');
  
});
router.get('/studentView', function (req, res, next) {
  res.render('studentView');
  
});



router.get('/setStudentRollNumberRoute', function (req, res, next) {
  res.render('setStudentRollNo');
  
});


module.exports = router;
