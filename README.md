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
