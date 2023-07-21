const Discord = require("discord.js");
const dashboard = require("discord.js-internal-dashboard");
const {
    QuickDB
} = require('quick.db');
module.exports = {
    name: "setup",
    aliases: ["dashboard", "s", "p"],
    cooldowns: 3000,
    description: "Setup bot with this dashboard",
    usage: "",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["ADMINISTRATOR"],
    botpermissions: ["ADMINISTRATOR"],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const db = new QuickDB({
            'table': `coffee`
        });

        
        const opt = {
            timeout: 150000, // OPTIONAL, defaults to 150000. Time in milliseconds of inactivity until the dashboard closes.
            startEmbed: {
                showCategoriesAndDescriptions: true, // OPTIONAL, defaults to "true". Whether or not to show category names and descriptions.
                embed: new Discord.MessageEmbed() // OPTIONAL. Design the embed here.
                    .setTitle(`Dashboard - ${client.user.username}`)
                    .setDescription("Choose a category to modify settings.")
                    .setThumbnail(client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setColor("#ffffff"),
            },
            categoryEmbed: new Discord.MessageEmbed() // OPTIONAL. Design the embed here.
                .setTitle(`Dashboard - ${client.user.username}`)
                .setDescription("Choose a options.")
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor("#ffffff"),
            closeEmbed: new Discord.MessageEmbed() // OPTIONAL. Design the embed here.
                .setTitle(`Dashboard - ${client.user.username}`)
                .setDescription(`The dashboard was closed for inactivity.`)
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor("RED"),
            categories: [
                {
                    name: "Guild Settings",
                    emoji: "⚙️", // OPTIONAL. The emoji to use for the category on the selection menu.
                    description: "The guild settings for the bot.",
                    settings: [
                        {
                            name: "Name",
                            description: "The guild name by 1, 2, 3 or 4.",
                            type: "textinput", // or "textarea" for a larger text inputs.
                            maxLength: 1, // OPTIONAL. The MAXIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Whether or not entering a new value into the setting is required.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                return await db.get(`Panel.nameNb`) || "3";
                            },
                            save: async (value) => {
                                // Save the value of the setting here.
                                await db.set(`Panel.nameNb`, value);
                                if(args[0] == "1") {
                                    let name = "✿ㄑ𝚂𝚙𝚛𝚒𝚗𝚐 𝙲𝚘𝚏𝚏𝚎𝚎";
                                    message.guild.setName(name)
                                }
                                if(args[0] == "2") {
                                    let name = "✹ㄑ𝚂𝚞𝚖𝚖𝚎𝚛 𝙲𝚘𝚏𝚏𝚎𝚎";
                                    message.guild.setName(name)
                                }
                                if(args[0] == "3") {
                                    let name = "❀ㄑ𝙰𝚞𝚝𝚞𝚖𝚗 𝙲𝚘𝚏𝚏𝚎𝚎";
                                    message.guild.setName(name)
                                }
                                if(args[0] == "4") {
                                    let name = "★ㄑ𝚆𝚒𝚗𝚝𝚎𝚛 𝙲𝚘𝚏𝚏𝚎𝚎";
                                    message.guild.setName(name)
                                }
                            }
                        },
                        {
                            name: "Join",
                            description: `Join chx id`,
                            type: "textinput", // or "textarea" for a larger text inputs.
                            minLength: 18,
                            maxLength: 20, // OPTIONAL. The MINIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Il est nécessaire de saisir ou non une nouvelle valeur dans le paramètre.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                return await db.get("Join_id")
                                
                            },
                            save: async (value) => {
                                await db.set(`Join_id`, value);
                            }
                        },
                        {
                            name: "Join Role",
                            description: `Join Role id`,
                            type: "textinput", // or "textarea" for a larger text inputs.
                            minLength: 18,
                            maxLength: 20, // OPTIONAL. The MINIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Il est nécessaire de saisir ou non une nouvelle valeur dans le paramètre.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                let role = await db.get("Join_Role")
                                let r = [];
                                role.forEach(f => {
                                    r.push(message.guild.roles.cache.get(f).name)
                                });
                                return r
                                
                            },
                            save: async (value) => {
                                await db.push(`Join_Role`, value);
                            }
                        }
                    ],
                    reset: async () => {
                        // OPTIONAL. Reset the value of the setting to the default here.
                        await db.delete(`Panel.nameNb`);
                        await db.delete(`Join_id`);
                    }
                 },
                 {
                    name: "Statistic",
                    emoji: "⚙️", // OPTIONAL. The emoji to use for the category on the selection menu.
                    description: "Stats",
                    settings: [{
                            name: "StatsTotal",
                            description: "StatsTotal",
                            type: "textinput", // or "textarea" for a larger text inputs.
                            minLength: 18,
                            maxLength: 20, // OPTIONAL. The MAXIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Whether or not entering a new value into the setting is required.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                return await db.get(`StatsTotal`) || "null";
                            },
                            save: async (value) => {
                                // Save the value of the setting here.
                                await db.set(`StatsTotal`, value);
                            }
                        },
                        {
                            name: "StatsUsers",
                            description: `StatsUsers`,
                            type: "textinput", // or "textarea" for a larger text inputs.
                            minLength: 18,
                            maxLength: 20, // OPTIONAL. The MINIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Il est nécessaire de saisir ou non une nouvelle valeur dans le paramètre.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                return await db.get(`StatsUsers`) || "null";
                            },
                            save: async (value) => {
                                // Save the value of the setting here.
                                await db.set(`StatsUsers`, value);
                            }
                        },
                        {
                            name: "StatsBots",
                            description: `StatsBots`,
                            type: "textinput", // or "textarea" for a larger text inputs.
                            minLength: 18,
                            maxLength: 20, // OPTIONAL. The MINIMUM length of the textinput/textarea (if used).
                            required: false, // OPTIONAL, defaults to false. Il est nécessaire de saisir ou non une nouvelle valeur dans le paramètre.
                            fetch: async () => {
                                // Get and return the saved value of the setting here.
                                return await db.get(`StatsBots`) || "null";
                            },
                            save: async (value) => {
                                // Save the value of the setting here.
                                await db.set(`StatsBots`, value);
                            }
                        }
                    ],
                    reset: async () => {
                        // OPTIONAL. Reset the value of the setting to the default here.
                        await db.delete(`StatsTotal`);
                        await db.delete(`StatsUsers`);
                        await db.delete(`StatsBots`);
                    }
                }

            ]
        }

        dashboard(message, opt)
    },
};