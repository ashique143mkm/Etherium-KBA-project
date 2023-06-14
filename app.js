var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require("web3");
var alert = require("alert-node");


web3 = new Web3("http://localhost:8545");
// Management Address
coinbase = "0xb1e7e67ee19501b3ba9e7c6dd8d1da638af21597"; 

var contractAddress = "0xadf971bbecba6f05b8a887ccbcc781d77251242d";
// Contract ABI
var contractAbi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mOrderDetailsMapping",
		"outputs": [
			{
				"name": "mfirmId",
				"type": "uint256"
			},
			{
				"name": "orderId",
				"type": "uint256"
			},
			{
				"name": "mproductDetails",
				"type": "string"
			},
			{
				"name": "mnumberOfUnits",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "setFinalOrderSummary",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "student",
		"outputs": [
			{
				"name": "rollNumber",
				"type": "uint256"
			},
			{
				"name": "studentAddress",
				"type": "address"
			},
			{
				"name": "adhaarNum",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "age",
				"type": "uint256"
			},
			{
				"name": "indian",
				"type": "bool"
			},
			{
				"name": "myGender",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_roll",
				"type": "uint256"
			}
		],
		"name": "studentFeeDetails",
		"outputs": [
			{
				"name": "_rollNumber",
				"type": "uint256"
			},
			{
				"name": "_feePayed",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "fOrderDetailsMapping",
		"outputs": [
			{
				"name": "ffirmAddress",
				"type": "address"
			},
			{
				"name": "orderId",
				"type": "uint256"
			},
			{
				"name": "fpriceOfOneUnit",
				"type": "uint256"
			},
			{
				"name": "ftotalPrice",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_roll",
				"type": "uint256"
			}
		],
		"name": "getStudent",
		"outputs": [
			{
				"name": "_rollNumber",
				"type": "uint256"
			},
			{
				"name": "_studentAddress",
				"type": "address"
			},
			{
				"name": "_adhaarNum",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_indian",
				"type": "bool"
			},
			{
				"name": "_myGender",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "firmPaymentMapping",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "firmPaymentAddressStorage",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "firmAddressStorage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_firmId",
				"type": "uint256"
			},
			{
				"name": "_orderId",
				"type": "uint256"
			},
			{
				"name": "_productDetails",
				"type": "string"
			},
			{
				"name": "_numberOfUnits",
				"type": "uint256"
			}
		],
		"name": "sendOrderDetailsToFirm",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mappingAdhaar",
		"outputs": [
			{
				"name": "rollNumber",
				"type": "uint256"
			},
			{
				"name": "studentAddress",
				"type": "address"
			},
			{
				"name": "adhaarNum",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "age",
				"type": "uint256"
			},
			{
				"name": "indian",
				"type": "bool"
			},
			{
				"name": "myGender",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_roll",
				"type": "uint256"
			},
			{
				"name": "_studentAddress",
				"type": "address"
			},
			{
				"name": "_adhaarNum",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			},
			{
				"name": "_indian",
				"type": "bool"
			},
			{
				"name": "_myGender",
				"type": "uint8"
			}
		],
		"name": "setStudent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_oId",
				"type": "uint256"
			}
		],
		"name": "getOrderDetailsFromSchool",
		"outputs": [
			{
				"name": "_firmId",
				"type": "uint256"
			},
			{
				"name": "_orderId",
				"type": "uint256"
			},
			{
				"name": "_productDetails",
				"type": "string"
			},
			{
				"name": "_numberOfUnits",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_roll",
				"type": "uint256"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "feePayment",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_firmAddress",
				"type": "address"
			},
			{
				"name": "_orderId",
				"type": "uint256"
			},
			{
				"name": "_priceOfOneUnit",
				"type": "uint256"
			},
			{
				"name": "_totalPrice",
				"type": "uint256"
			}
		],
		"name": "sendOrderDetailsToSchool",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "getFinalOrderSummary",
		"outputs": [
			{
				"name": "_oId",
				"type": "uint256"
			},
			{
				"name": "_fId",
				"type": "uint256"
			},
			{
				"name": "_fAddress",
				"type": "address"
			},
			{
				"name": "_pDetails",
				"type": "string"
			},
			{
				"name": "_numOfUnits",
				"type": "uint256"
			},
			{
				"name": "_priceOfOneUnit",
				"type": "uint256"
			},
			{
				"name": "_totalPrice",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_firmId",
				"type": "uint256"
			},
			{
				"name": "_firmName",
				"type": "string"
			},
			{
				"name": "_firmAddress",
				"type": "address"
			}
		],
		"name": "setFirmDetails",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "firmOrderAddressMapping",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_firmId",
				"type": "uint256"
			}
		],
		"name": "getFirmDetails",
		"outputs": [
			{
				"name": "_fId",
				"type": "uint256"
			},
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_fAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "studentPaymentMapping",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "studentAddressStorage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "finalOrderSummaryMapping",
		"outputs": [
			{
				"name": "firmId",
				"type": "uint256"
			},
			{
				"name": "orderId",
				"type": "uint256"
			},
			{
				"name": "productDetails",
				"type": "string"
			},
			{
				"name": "numberOfUnits",
				"type": "uint256"
			},
			{
				"name": "priceOfOneUnit",
				"type": "uint256"
			},
			{
				"name": "totalPrice",
				"type": "uint256"
			},
			{
				"name": "firmAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "paidToFirm",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "firmWithdrawedFromContract",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "feesPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "feeWithdrawed",
		"type": "event"
	}
];






SFTS = new web3.eth.Contract(contractAbi, contractAddress);

var indexRouter = require('./routes/index');
var managementRouter = require('./routes/management');
var firmRouter = require('./routes/firm');
var studentRouter = require('./routes/student');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/management',managementRouter);
app.use('/firm',firmRouter);
app.use('/student',studentRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
