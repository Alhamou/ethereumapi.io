const axios = require("axios")
const {endpointURLs, contract} = require("../helper/global")

const accountsController = (function(){


    const obj = {}
    const key = process.env.API_ETHEREUM

    // Get Ether Balance for a Single Address
    // Returns the Ether balance of a given address.
    obj.balance = async function(req, res, next){

        
        try{

            const account1 = "0x1CA0839815cE940760618057a77D778C4ECF9B82"

            const getAccounts = `${endpointURLs}/api?module=account&action=txlist&address=${account1}&tag=latest&apikey=${key}`

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

        
    }

    // Get Ether Balance for Multiple Addresses in a Single Call
    // Returns the balance of the accounts from a list of addresses.
    obj.balancemulti = async function(req, res, next){


        try{

            const account1 = "0x1CA0839815cE940760618057a77D778C4ECF9B82"
            const account2 = "0x5c4658ae4233D50d062603e22F607d573401A0a2"

            const getAccounts = `
            ${endpointURLs}/api?module=account&action=balancemulti&address=${account1},${account2}&apikey=${key}`

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

        
    }

    // Get a list of 'Normal' Transactions By Address
    // Returns the list of transactions performed by an address, with optional pagination.
    // Note : This API endpoint returns a maximum of 10000 records only.
    obj.listNormalTransactions = async function(req, res, next){

        try{

            const account1 = "0x1CA0839815cE940760618057a77D778C4ECF9B82"

            const getAccounts = `
                ${endpointURLs}/api
                ?module=account
                &action=txlist
                &address=${account1}
                &startblock=0
                &endblock=99999999
                &page=1
                &offset=10
                &sort=asc
                &apikey=${key}`.replace(/ |\n/mgi, "")

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

    }

    // Get a list of 'Internal' Transactions by Address
    // Returns the list of internal transactions performed by an address, with optional pagination.
    // Note : This API endpoint returns a maximum of 10000 records only.
    obj.listInternalTransactions = async function(req, res, next){
        
        try{

            const account1 = "0x1CA0839815cE940760618057a77D778C4ECF9B82"

            const getAccounts = `
                ${endpointURLs}/api
                ?module=account
                &action=txlistinternal
                &address=${account1}
                &startblock=0
                &endblock=99999999
                &page=1
                &offset=10
                &sort=asc
                &apikey=${key}`.replace(/ |\n/mgi, "")

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

    }


    // Get 'Internal Transactions' by Transaction Hash
    // Returns the list of internal transactions performed within a transaction.
    // Note : This API endpoint returns a maximum of 10000 records only.
    obj.txlistinternal = async function(req, res, next){
        
        try{

            const txhash = "0x38b2e56d17eefa87df185e3c79a8eb25d12df015b979d28329b80a2db71020d5"

            const getAccounts = `
                ${endpointURLs}/api
                ?module=account
                &action=txlistinternal
                &txhash=${txhash}
                &apikey=${key}`.replace(/ |\n/mgi, "")

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

    }

    // Get "Internal Transactions" by Block Range
    // Returns the list of internal transactions performed within a block range, with optional pagination.
    // Note : This API endpoint returns a maximum of 10000 records only.
    obj.txlistinternalByBlock = async function(req, res, next){
        
        try{


            const getAccounts = `
                ${endpointURLs}/api
                ?module=account
                &action=txlistinternal
                &startblock=9544456
                &endblock=9545456
                &page=1
                &offset=10
                &sort=asc
                &apikey=${key}`.replace(/ |\n/mgi, "")

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

    }


    // Get a list of 'ERC20 - Token Transfer Events' by Address
    // Returns the list of ERC-20 tokens transferred by an address, with optional filtering by token contract.
    obj.listERC20TokenTransferByAddress = async function(req, res, next){
        
        try{


            const getAccounts = `
                ${endpointURLs}/api
                ?module=account
                &action=tokentx
                &contractaddress=0x01be23585060835e02b77ef475b0cc51aa1e0709
                &address=0xb79d1f53e192bde4bcdcaad9dc854cd555c96e27
                &page=1
                &offset=100
                &startblock=0
                &endblock=99999999
                &sort=asc
                &apikey=${key}`.replace(/ |\n/mgi, "")

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

    }



    // Get a list of 'ERC721 - Token Transfer Events' by Address
    // Returns the list of ERC-721 ( NFT ) tokens transferred by an address, with optional filtering by token contract
    obj.listERC721TokenTransferByAddress = async function(req, res, next){
        
        try{

            const account1 = "0x1CA0839815cE940760618057a77D778C4ECF9B82"

            const getAccounts = `
                ${endpointURLs}/api
                ?module=account
                &action=tokennfttx
                &contractaddress=${contract}
                &address=${account1}
                &page=1
                &offset=100
                &startblock=0
                &endblock=99999999
                &sort=asc
                &apikey=${key}`.replace(/ |\n/mgi, "")

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

    }

    // Get list of Blocks Mined by Address
    // Returns the list of blocks mined by an address.
    obj.listBlocksMinedbyAddress = async function(req, res, next){
        
        try{

            const account1 = "0x1CA0839815cE940760618057a77D778C4ECF9B82"

            const getAccounts = `
                ${endpointURLs}/api
                ?module=account
                &action=getminedblocks
                &address=${account1}
                &blocktype=blocks
                &page=1
                &offset=10
                &apikey=${key}`.replace(/ |\n/mgi, "")

            const query = await axios.get(getAccounts)

            res.json({result: query.data})

        } catch(error){

            console.log(error)

            res.status(400).json({result: error.data})

        }

    }


    return obj
})()



module.exports = accountsController;