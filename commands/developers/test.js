const Discord = require("discord.js");
const {dashboard} = require('../../others/sp')
const cl = require('../../index')
module.exports = {
   name: "t",
   aliases: ["", "", ""],
   cooldowns: 3000,
   description: "",
   usage: "",
   toggleOff: false,
   developersOnly: true,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
      cl.emit("guildMemberAdd", async member => {})
   },
};
