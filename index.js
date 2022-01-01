// Whole-script strict mode syntax
// 'use strict';
require('dotenv').config()
const express = require("express")
const app = new express()
const  path = require("path")

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
}


app.use("/", express.static(path.join(__dirname, "./src/public")));


const accountsRouters = require("./src/routers/Accounts")



app.use("/accounts", accountsRouters)

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./index.html"));
// });


const PORT = Number(process.env.PORT || 3000)
app.listen(PORT, ()=>{
    console.log("App running on Port:", PORT)
})
