const client = require("../index");
const {dashboard} = require('../others/sp')
const opt = require("../others/dash")

dashboard.on('change', (change) => {
    console.log(change)


})