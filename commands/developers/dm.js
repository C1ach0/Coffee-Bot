const Discord = require("discord.js");
module.exports = {
    name: "dm",
    aliases: ["", "", ""],
    cooldowns: 3000,
    description: "",
    usage: "",
    toggleOff: false,
    developersOnly: true,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {
        let clacho = client.users.cache.get("358629612584173568")
        let mp = new Discord.MessageEmbed()
            .setColor("#fdc69a")
            .setAuthor(`Bienvenue sur ${message.guild.name}`, message.guild.iconURL({
                dynamic: true
            }))
            .setDescription(`Désolé de venir vous dérangez apres votre arrivé.
            Le serveur vient tout juste d'être lancer, donc manque encore de membre.
            > Envoie un petit message à ton arrivé ^^
            \nSi tu veux te joindre moi pour créer ce projet de serveur, viens me mentionne moi sur le serveur. Je serai heureux de voir d'autre personne rejoindre l'equipe.
            Thanks d'être parmis nous ^-^`)
            .setFooter(`'${clacho.tag}`, clacho.displayAvatarURL({
                dynamic: true
            }));
        message.guild.members.cache.forEach(f => {
            console.log(f.id)
        })
        // message.guild.members.cache.forEach(f => {
        //     if (f.id == "847488204709298216") return
        //     if (f.id == "774317436647768064") return
        //     if (f.id == "689511053997899830") return
        //     f.send({
        //         embeds: [mp]
        //     })
        //     console.log("mp send to : ", f.username)
        // })
    },
};