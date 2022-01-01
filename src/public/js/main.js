const controller = (function(){

    const obj = {}

    let isConnected = false;
    let currentAccount = null;

    obj.getcurrentAccount = async ()=> {
        return currentAccount
    }

    obj.setAddress = async function(address){

        
        isConnected = false;
        let balance = "";

        address = Array.isArray(address) ? (address.length > 0 ? address[0] : "") : address

        if(address){
            currentAccount = address
            isConnected= true
            address = "HALLO: " + address

            const web3 = new Web3(Web3.givenProvider);
            balance = await web3.eth.getBalance(currentAccount)
            
            balance = Number(web3.utils.fromWei(balance, "ether")).toFixed(4)  + " ETH"

        }
        document.querySelector("p").innerText = balance
        document.querySelector("h1").innerText = address

    }

    obj.connect = async ()=>{

        if(isConnected) return

        try{
            await ethereum.request({ method: 'eth_requestAccounts' })
        } catch(error){
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(error);
            }
        }
    }

    // For now, 'eth_accounts' will continue to always return an array
    obj.handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
        }
    }
    
    obj.obload = (()=>{


        ethereum.on('accountsChanged', (accounts) => {

            currentAccount = accounts
            console.log(accounts)
            obj.setAddress(accounts)
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

        
        setTimeout(async ()=>{

            currentAccount =  ethereum.selectedAddress
    
            controller.setAddress(currentAccount)
    
        },100)

        document.getElementById('connectButton').addEventListener("click", obj.connect)

    })()
    return obj
})()

