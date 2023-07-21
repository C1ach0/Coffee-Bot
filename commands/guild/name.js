const Discord = require("discord.js");

module.exports = {
   name: "gname",
   aliases: ["", "", ""],
   cooldowns: 3000,
   description: "change guild name for season",
   usage: "1/2/3/4",
   toggleOff: false,
   developersOnly: true,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
    /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     * @returns
     */
     run: async (client, message, args) => {
    if(!args[0]) {
        let emb = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setDescription("1 : Spring\n2: Summer\n3 : Autumn\n4 : Winter")
        return message.channel.send({embeds: [emb]})    
    }

    if(args[0] == "1") {
        let name = "✿ㄑ𝚂𝚙𝚛𝚒𝚗𝚐 𝙲𝚘𝚏𝚏𝚎𝚎";
        message.guild.setName(name)
        return message.react('🎈')
    }
    
    if(args[0] == "2") {
        let name = "✹ㄑ𝚂𝚞𝚖𝚖𝚎𝚛 𝙲𝚘𝚏𝚏𝚎𝚎";
        message.guild.setName(name)
        return message.react('🎈')
    }
    
    if(args[0] == "3") {
        let name = "❀ㄑ𝙰𝚞𝚝𝚞𝚖𝚗 𝙲𝚘𝚏𝚏𝚎𝚎";
        message.guild.setName(name)
        return message.react('🎈')
    }
    
    if(args[0] == "4") {
        let name = "★ㄑ𝚆𝚒𝚗𝚝𝚎𝚛 𝙲𝚘𝚏𝚏𝚎𝚎";
        message.guild.setName(name)
        return message.react('🎈')
    }
   },
};
