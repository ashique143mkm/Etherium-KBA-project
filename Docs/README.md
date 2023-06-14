#Project Name : 
School Fund Tracking System(SFTS)
			
##Group Members : 

1.Ashique M.K
2.Jerin Jose
3.Yadu N.M		

###Description:

SFTS is simple a Decentralised Application which uses concept of public blockchain to bring the transparency between students and the management.It also houses student data management and the communication between School management and the firm which is made available to the students so that they can verify the data and payment details transferred between the Firm and the School Management.Management can Add Students,View Student Details,View Student Fee Details,Add Firms,View Firm Details,Send Order to Firms,Pay to Firms,View Balance,View Order Summary.The Students can then view the Order Summary between the School and the Firm and also to pay fee to the Management.The Firm can View the Orders from School,Send The Price details back to the School and View Balance.

####Prerequisites:

In order to run this project locally in your computer you need the following packages installed in your System and the commands to install the packages are given below:

1. You need to install Nodejs.

	<command> : sudo apt-get install nodejs

2. Change directory to the project directory
 
	<command> : cd SFTS

3. Run the following commands before the project is run:

	1. sudo apt-get install npm
	2. npm install
	3. npm install express-generator
	4. npm install web3
	5. npm install solc
	6. npm install truffle

4. After running the above commands :
		
	

	1. Open a terminal and type the following command to run a Development Environment Chain ;


			
		geth --datadir devchaindata --unlock 0,1,2,3,4,5,6,7,8,9 --rpc --rpcport "8545" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --ipcpath 			"~/.ethereum/geth.ipc" --dev

	[Note] : The accounts numbering from 0 to 9 were created locally on the machine in which the project was tested.Make sure you create accounts before 			 running the above command. 
		

	2. Now open the Remix IDE and change the Environment to WEB3 Provider this will ensure that it is interacting with the DevChain.Deploy the contract in 		   Remix.Copy the contract address and paste it in the app.js file of project as >>var contractAddress="Paste contract address Here".Copy the ABI of the  	     contract and paste it in the contractABI variable as >>var contractABI = Paste your ABI here; set var coinbase=the address which deployed the contract.
	
	3. Open a terminal in the SFTS folder : Type the command ->npm start ;this will start running the project on localhost:3000.	

	4. Open your browser and type localhost:3000 the project will be running on that localhost.


