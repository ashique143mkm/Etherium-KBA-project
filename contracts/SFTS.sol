pragma solidity ^0.5.0;


contract FirmAndFunctions{
                                                // Variables //
    
    
  
    address managementAddress;
    
    
                                        //          Mappings          //
                                        
                                        
                                        
    mapping(address => uint)  public  firmPaymentMapping;
    mapping(uint=>firmProfile) firmProfileMapping;
    mapping(uint=>address) public firmPaymentAddressStorage;
    mapping(address=>uint) public firmAddressStorage;
    mapping(uint=>address) public firmOrderAddressMapping;
    mapping(uint=>mOrderDetails) public mOrderDetailsMapping;
    mapping(uint=>fOrderDetails) public fOrderDetailsMapping;  
    mapping(uint => finalOrderSummary) public finalOrderSummaryMapping;
        constructor() public {
            managementAddress=msg.sender;
        }    
        
                                        // Modifiers //
        // Set msg.sender as Management Address
         modifier onlyManagement{
        require(managementAddress==msg.sender);
        _;
    }
    
    // Check Firm Address true or not
     modifier checkAddress(address who) { 
        require(firmAddressStorage[who] != 0); 
        _; 
        
    }
    
       
                                            // Structures//
                             
      struct firmProfile{
          
        uint firmId;
        string firmName;
        address firmAddress;
        
    }
    
   
       struct mOrderDetails{
        
        uint mfirmId;
        uint orderId;
        string mproductDetails;
        uint mnumberOfUnits;
       }
        struct fOrderDetails{
        
       address ffirmAddress;
        uint orderId;
        uint fpriceOfOneUnit;
        uint ftotalPrice;
        
       }
        struct finalOrderSummary
    {
        uint firmId;
        uint orderId;
        string productDetails;
        uint numberOfUnits;
        uint priceOfOneUnit;
        uint totalPrice;
        address firmAddress;
       
    }
       
      
    //   School sends details to firm
       function sendOrderDetailsToFirm(uint _firmId,uint _orderId,string memory _productDetails,uint _numberOfUnits) public onlyManagement{
           mOrderDetailsMapping[_orderId]=mOrderDetails(_firmId,_orderId,_productDetails,_numberOfUnits);
           
       } 
    //   Firm GEts details From School
       function getOrderDetailsFromSchool(uint _oId)public view returns(uint _firmId,uint _orderId,string memory _productDetails,uint _numberOfUnits)
       {
           _firmId=mOrderDetailsMapping[_oId].mfirmId;
           _orderId=mOrderDetailsMapping[_oId].orderId;
           _productDetails=mOrderDetailsMapping[_oId].mproductDetails;
           _numberOfUnits=mOrderDetailsMapping[_oId].mnumberOfUnits;
       }
      
    //   Firm Sends  Price Details To Firm
       function sendOrderDetailsToSchool(address _firmAddress,uint _orderId,uint _priceOfOneUnit,uint _totalPrice) public checkAddress(_firmAddress)
       {
           fOrderDetailsMapping[_orderId]=fOrderDetails(_firmAddress,_orderId,_priceOfOneUnit,_totalPrice);
           setFinalOrderSummary(_orderId);
       }
       

   
     //  After Checking the Order ID's are equal All variable data is Stored into a Structure
    function setFinalOrderSummary(uint _orderId)public{
        
        if(mOrderDetailsMapping[_orderId].orderId==fOrderDetailsMapping[_orderId].orderId)
        {
            
            finalOrderSummaryMapping[_orderId].firmId=mOrderDetailsMapping[_orderId].mfirmId;
            
            finalOrderSummaryMapping[_orderId].orderId=mOrderDetailsMapping[_orderId].orderId;
            finalOrderSummaryMapping[_orderId].productDetails=mOrderDetailsMapping[_orderId].mproductDetails;
            finalOrderSummaryMapping[_orderId].numberOfUnits=mOrderDetailsMapping[_orderId].mnumberOfUnits;
            finalOrderSummaryMapping[_orderId].firmAddress=fOrderDetailsMapping[_orderId].ffirmAddress;
            finalOrderSummaryMapping[_orderId].priceOfOneUnit=fOrderDetailsMapping[_orderId].fpriceOfOneUnit;
            finalOrderSummaryMapping[_orderId].totalPrice=fOrderDetailsMapping[_orderId].ftotalPrice;
        
        }
        
        
        
    }
//   Get Final Order Summary Using Order ID
    function getFinalOrderSummary(uint _orderId) public view returns(uint _oId,uint _fId,address _fAddress,string memory _pDetails,uint _numOfUnits,uint _priceOfOneUnit,uint _totalPrice)
    {
        _oId=finalOrderSummaryMapping[_orderId].orderId;
        _fId=finalOrderSummaryMapping[_orderId].firmId;
        _fAddress=finalOrderSummaryMapping[_orderId].firmAddress;
        _pDetails=finalOrderSummaryMapping[_orderId].productDetails;
        _numOfUnits=finalOrderSummaryMapping[_orderId].numberOfUnits;
        _priceOfOneUnit=finalOrderSummaryMapping[_orderId].priceOfOneUnit;
        _totalPrice=finalOrderSummaryMapping[_orderId].totalPrice;
    }
    
                     
    
   
    
                                      //             Events          //
                                      
    
    event paidToFirm(string message, uint amount);
    event firmWithdrawedFromContract(string message, uint amount);
    
    
    
   
                                                // Functions //
      
   
                                            // Management Sets Firm //
              
     function setFirmDetails(uint _firmId,string memory _firmName,address _firmAddress) public onlyManagement{
        
        firmProfileMapping[_firmId]=firmProfile(_firmId,_firmName,_firmAddress);
        firmAddressStorage[_firmAddress]=_firmId;
        
      }
      
                                        //  Get Firm Details //
                                        
      function getFirmDetails(uint _firmId) public onlyManagement view returns(uint _fId,string memory _fName,address _fAddress)
      {
          _fId=firmProfileMapping[_firmId].firmId;
          _fName=firmProfileMapping[_firmId].firmName;
          _fAddress=firmProfileMapping[_firmId].firmAddress;
      }
    
    
   
   
                       
    
    
}
                                        // CONTRACT //


                    // Student Pays Fees to the Management //

contract StudentPaysFee{
                                        //  Variables //
                                        
    address managementAddress;
    
                                        // Mappings //
                                        
    mapping(uint => uint)  public  studentPaymentMapping;
 
    
    
    
    
    
                                    //   Events     //
                                    
    event feesPaid(string message, uint amount);
    event feeWithdrawed(string message, uint amount);
     
     
    
     
     
    constructor() public{
        managementAddress = msg.sender;    
    }
                                    //  Modifiers //
            // Check Whether msg.sender is Management                        // 
                                    
    modifier onlyManagement{
        require(managementAddress == msg.sender);
        _;
    }
    
    
    
                        // Student Pays Fee To School//
                        
    function feePayment(uint _roll,uint _amount) public payable {
        studentPaymentMapping[_roll] += _amount;
        emit feesPaid("Payment completed", _amount);
    }
    
                            // Get Student Fee Details //
                            
    function studentFeeDetails(uint _roll) public onlyManagement view returns (uint _rollNumber,uint _feePayed){
        _rollNumber=_roll;
        _feePayed = studentPaymentMapping[_roll];
        
        
    }
                         
    
}



                            //  SFTS Contract Inherits all the other contracts //

contract SchoolFundTrackingSystem is StudentPaysFee,FirmAndFunctions{
    
    enum gender {male, female, other}
    
    address managementAddress;
    
    mapping(uint => studentProfile) public  student;
    mapping(uint=>studentProfile) public mappingAdhaar;
    mapping(address=>uint) public studentAddressStorage;
    
    
    // Assign managenment address
    
    constructor() public {
        managementAddress=msg.sender;
    }
    // Check Address is Not management Address
    modifier notManagement{
        require(msg.sender!=managementAddress);
        _;
    }
    struct studentProfile {
        uint rollNumber;
        address studentAddress;
        uint adhaarNum;
        string name;
        uint age;
        bool indian;
        gender myGender;
       
    }
    
  
   
                                         // Set Student Details//
                                         
    function setStudent(uint _roll,address _studentAddress,uint _adhaarNum,string memory _name,uint _age,bool _indian,gender _myGender) public onlyManagement {
        student[_roll]=studentProfile(_roll,_studentAddress,_adhaarNum,_name,_age,_indian,_myGender);
        studentAddressStorage[_studentAddress]=_roll;
        
        
       
    }
     
                                        // Get Student Details//
    
    function getStudent(uint _roll) public view returns (uint _rollNumber,address _studentAddress,uint _adhaarNum,string memory _name, uint _age, bool _indian, gender _myGender){
       
        _rollNumber=student[_roll].rollNumber;   
        _adhaarNum=student[_roll].adhaarNum;
        _name = student[_roll].name;
        _age = student[_roll].age;
        _indian = student[_roll].indian;
        _myGender = student[_roll].myGender;
        _studentAddress=student[_roll].studentAddress;
     
    }
   
    
    
}