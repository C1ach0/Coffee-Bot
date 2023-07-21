const botdash = require('botdash.pro');
const { botdashToken } = require('../botconfig/main.json')
let dashboard = new botdash.Client(botdashToken); 

module.exports = {
    dashboard,
};