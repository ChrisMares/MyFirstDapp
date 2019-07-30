# MyFirstDapp
A functioning web3 webpage and a smart contract that is deployed to the Ropsten test net

##### This entire project should be run on the Ropsten test network, out of an abundance of safety do not use any real Ether from the main net

### Tools Needed: 
1. MetaMask - download this chrome extension and have it running in your browser. Select the Ropsten test net
2. Get some test Ether from a faucet. https://faucet.ropsten.be/ Use your Ropsten test address in MetaMask and send yourself some ether.
3. https://remix.ethereum.org/ - Remix IDE - Used for developing and deploying the smart contract. To see the smart contract copy/paste the barcodes.sol file in this IDE. From here you can play around, complile, deploy and interact with the smart contract. (This is not needed to get the site functioning)
4. In order for MetaMask to sync up with the page properly it must run in HTTP or HTTPS, You cannot just open the index.html file up. 
5. "$ npm install -g http-server" (Mac terminal, install npm if you don't have it)  ... this is a simple http server you can use locally to open the website if you are on a Mac. If you are on windows google for an equivilent http server for that OS. 
6. cd to your project directory and run "$ http-server" in the comand line. This will fire up a few http links you can open, copy the http urls into your browser and you should be up and running on the site. 

### Using the page 
The concept of this page is to store a data structure in Ethereum smart contract and interact with it. The idea is that we are going to store "barcodes" or any message and sign them with our meta-mast wallet's private keys.

The button at the bottom can "decode" the signiture if you pass a barcode that is stored in the array. When you decode it will return to you the public key of the accoutn that signed it! This can be used for message verification. 



##### The Data (from the smart contract)
- _barcode // can be any string message 
- _signiture // The digital signiture of the account that inserted the barcode data 
- _timeBlock // The timestamp of the block in which the transaction occured

### The Code
This site is a simple html / javascript file with JQuery. 
- window.ethereum - this object is injected by the metamask browser. In order to interact with the blockchain you must be linked up to an Ethereum node, metamask asks as that node. 
- infura - this is a fallback node if metamask is not reached, Infura is a website where you can get access to free ethereum nodes
- contract_address - When you deploy the contract through remix to the test server, a contract address will be generated. The address that is hardoded by default is the contract I already have deployed to the Ropsten test net. 
- contract_abi - A contract ABI is a json representation of of your data contract. Anytime you change the contract and compile in Remix there is a link in Remix where you can copy the ABI and paste it in here. An ABI is what allows your web3.js code to know what functions are on your contract. 
- contract.methods - this is the web3.js call used to hit your smart contract methods 
