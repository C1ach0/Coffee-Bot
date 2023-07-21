const Discord = require("discord.js");
const { QuickDB } = require('quick.db')
let db = new QuickDB({
    "table": "coffee"
})
module.exports = {
   name: "stats",
   aliases: ["", "", ""],
   cooldowns: 3000,
   description: "",
   usage: "",
   toggleOff: false,
   developersOnly: true,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    let mod = args[0]
    let id = args[1]
    if(!mod || !id) return message.react('💢')
    await db.set("StatsTotal", id)
    return message.react("🎈")
   },
};
