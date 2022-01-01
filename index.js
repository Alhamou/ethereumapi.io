// Whole-script strict mode syntax
// 'use strict';
require('dotenv').config()
const express = require("express")
const app = new express()

// const options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: ['htm', 'html'],
//     index: false,
//     maxAge: '1d',
//     redirect: false,
//     setHeaders: function (res, path, stat) {
//       res.set('x-timestamp', Date.now())
//     }
// }


app.use(express.static('public', options));


const accountsRouters = require("./src/routers/Accounts")


app.use("/accounts", accountsRouters)


app.listen(3000)
