const Discord = require("discord.js");
const { QuickDB } = require('quick.db')
let db = new QuickDB({
    "table": "coffee"
})
module.exports = {
   name: "rolejoin",
   aliases: ["rj", "", ""],
   cooldowns: 3000,
   description: "",
   usage: "",
   toggleOff: false,
   developersOnly: true,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    let id = args[0]
    if(!id) return message.react('💢')
    await db.push("Join_Role", id)
    return message.react("🎈")
   },
};
