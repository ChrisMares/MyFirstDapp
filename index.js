
const contract_address = "0x4b4f7d64ded7cd733e12fcbad26bcd3ab7c707b5";
const contract_abi = [{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"signature","type":"bytes"}],"name":"recover","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_barcode","type":"string"},{"name":"_signiture","type":"bytes"}],"name":"addBarcode","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBarcodesLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"barcodes","outputs":[{"name":"_barcode","type":"string"},{"name":"_signiture","type":"bytes"},{"name":"_timeBlock","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var contract;
var web3js;
var ethereum; //window.ethereum, injected by metamask on page load
var accounts; //array of accounts in metamask

$(document).ready(function(){

  //Check if MetaMask Present
  if (typeof window.ethereum !== 'undefined') {
    ethereum = window.ethereum;
    web3js = new Web3(ethereum);

    ethereum.enable()
    .then(function (accounts) {
      console.log("metamask enabled");
      this.accounts = accounts;
    })
    .catch(function (reason) {
      console.log(reason === "User rejected provider access")
    })
  //Fallback use Infura node for read-only stuff
  } else {
    console.log("using Infura");
    web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/1d446d562057460095d08687b1da72b3"));
  }

  contract = new web3js.eth.Contract(contract_abi, contract_address);

  var output = $("#output");

///////////////////////////////
  
  //Interact with wallet balance example
  var getGasPrice = function getGasPrice(){
   
    web3js.eth.getGasPrice().then((result) => {
        console.log(web3js.utils.fromWei(result, 'ether'));
        output.val( output.val() + "Gas Price in Wei \n");
        output.val( output.val() + result + "\n");
        output.val( output.val() + "Gas Price in Ether \n");
        output.val( output.val() + web3js.utils.fromWei(result, 'ether') + "\n");
      });
  }

  var getBarcodes = function getBarcodesArray(){

    contract.methods.getBarcodesLength().call((err, length) => {
      for (var i = 0; i < length; i++) { 
        contract.methods.barcodes(i).call((err, result) => 
        { 
          console.log("barcode", result._barcode);
          console.log("signiture", result._signiture);

          output.val( output.val() + result._barcode + " - " + result._signiture.substring(0,10)+"..." + " - " + result._timeBlock + "\n");
        });
      }
    });
  }

  var setBarcode = function setBarcode(barcode){

    output.val( output.val() + "Adding barcode to array with digitial signiture... \n\n");

    const message = web3.sha3(barcode);
    
    output.val( output.val() + "Barcode:" + barcode + "\n\n");
    output.val( output.val() + "Barcode Hash sha3:\n" + message + "\n\n");

    web3.eth.sign(accounts[0], message, function (err, result) {
      var signature = result;
    
      output.val( output.val() + "Message signed by private keys:\n" + signature + "\n\n");

      contract.methods.addBarcode(barcode,signature).send({from: accounts[0]}, (error, txHash) => {
        output.val( output.val() + "Transaction Completed!");
        output.val( output.val() + "Transaction Hash:\n" + txHash);
        console.log(error, txHash);
      });

    });
  }

  var decode = function decode(barcode)
  {
    //Spin through barcodes data structure and when the BC matches, grab the signiture and decode it to get the address
    contract.methods.getBarcodesLength().call((err, length) => {

      for (var i = 0; i < length; i++) { 

        contract.methods.barcodes(i).call((err, result) => 
        { 
          if(result._barcode === barcode){
            console.log("----------- barcode matched");
              const messageHash = web3.sha3(result._barcode);
        
              console.log(result._barcode);
              console.log(result._signiture);
              console.log(messageHash);
        
              contract.methods.recover(messageHash, result._signiture).call((err, address) =>  
              {
                console.log("err, address");
                console.log(err, address);
                output.val( output.val() + "Decoded Account Address! \n");
                output.val( output.val() + address + "\n");
              });

          }
        });
      }
    });
  }

  /////BUTTON INTERACTIONS
  $("#getBarcodesBtnId").click(function() {
    getBarcodes();
  });

  $("#getGasPriceId").click(function() {
    getGasPrice();
  });

  $("#getFirstAccountButtonId").click(function() {
    console.log(ethereum.networkVersion);
    console.log(ethereum.selectedAddress);
    console.log(ethereum.isMetaMask);
    console.log(accounts);
    console.log(accounts[0]);
    output.val( output.val() + "Account from metamask \n");
    output.val( output.val() + accounts[0] + "\n");
  });


  $("#setBarcodeButtonId").click(function() {
    var barcodeInput = $("#setBarcodeTextId").val();
    setBarcode(barcodeInput);
  });

  $("#decodeBarcodeId").click(function() {
    console.log("decode barcode");
    var bc = $("#barcodeToFindId").val();
    decode(bc);
  });

  $("#clear").click(function() {
    $('#output').val('');
  });

});