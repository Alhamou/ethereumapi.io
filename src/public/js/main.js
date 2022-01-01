


    let isConnected = false;
    let currentAccount = null;

(async function(){

    // In Node.js use: const Web3 = require('web3');


    const setAddress = function(address){

        isConnected = false;

        address = Array.isArray(address) ? (address.length > 0 ? address[0] : "") : address

        if(address){
            currentAccount = address
            isConnected= true
            address = "HALLO: " + address
        }
        
        document.querySelector("h1").innerText = address


    }

    setTimeout(async ()=>{

        currentAccount =  window.ethereum.selectedAddress

        if(currentAccount){
            setAddress(currentAccount)
            console.log(currentAccount)
        }

        const web3 = new Web3(Web3.givenProvider);
        const balance = await web3.eth.getBalance(currentAccount)
        document.querySelector("p").innerText = Number(web3.utils.fromWei(balance, "ether")).toFixed(4)  + " ETH"

    },100)


    ethereum.on('accountsChanged', (accounts) => {

        currentAccount = accounts
        console.log("accountsChanged", accounts)

        setAddress(accounts)
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
    });
    
    ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.

        console.log("chainChanged", chainId)

        
        window.location.reload();
    });


      
    ethereum.on('connect', (connectInfo) => {
        
        console.log("connect", connectInfo)

    });


    ethereum.on('disconnect', (error) => {
        
        console.log("disconnect", error)

    });


    ethereum.on('message', (message) => {
        
        console.log("disconnect", error)

    });


    // For now, 'eth_accounts' will continue to always return an array
    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            // Do any other work!
        }
    }
    
    /*********************************************/
    /* Access the user's accounts (per EIP-1102) */
    /*********************************************/

    // You should only attempt to request the user's accounts in response to user
    // interaction, such as a button click.
    // Otherwise, you popup-spam the user like it's 1999.
    // If you fail to retrieve the user's account(s), you should encourage the user
    // to initiate the attempt.

    document.getElementById('connectButton').addEventListener("click", connect)


    // While you are awaiting the call to eth_requestAccounts, you should disable
    // any buttons the user can click to initiate the request.
    // MetaMask will reject any additional requests while the first is still
    // pending.
    
    async function connect() {

        if(isConnected) return


        window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
        });
    }


})()

const some = (function(){

    const obj = {}

    obj.getcurrentAccount = async ()=> {
        return currentAccount
    }

    return obj
})()

