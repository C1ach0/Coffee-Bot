const Discord = require("discord.js");
const {
    QuickDB
} = require('quick.db')
let db = new QuickDB({
    "table": "coffee_list"
})
module.exports = {
    name: "blacklist",
    aliases: ["bl", "", ""],
    cooldowns: 3000,
    description: "blacklist a member before join for instant ban",
    usage: "",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        let id = args[0]
        let reason = `${args[1]} | Blacklisted by ${message.author.tag}` || `No Reason | Blacklisted by ${message.author.tag}`
        if (!id) return message.reply("no id")
        let pbm = {
            "id": id,
            "reason": reason
        }
        await db.push("blacklist", pbm)
        return message.react('🎈')
    },
};