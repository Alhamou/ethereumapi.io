const api = require("../../etherApiConfig.json")

const init = (function(){

    const obj = {}

    obj.endpointURLs = process.env.MODE === "DEV" ? api.dev.RInkeby : api.dev.Mainnet
    
    obj.contract = process.env.CONTRACT

    return obj
})()


module.exports = init;