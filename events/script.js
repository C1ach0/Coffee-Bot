const client = require("../index");
const {
    MessageEmbed,
    Message,
    MessageAttachment,
    Collection
} = require('discord.js');
const {
    QuickDB
} = require('quick.db');

const invites = new Collection();

const wait = require("timers/promises").setTimeout;

client.on("ready", async () => {
    await wait(1000);
    client.guilds.cache.forEach(async (guild) => {
        const firstInvites = await guild.invites.fetch();
        invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    });
    setInterval(() => {
        client.guilds.cache.forEach(async (guild) => {
            const firstInvites = await guild.invites.fetch();
            invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
        });
    }, 10000)
});

client.on('guildMemberAdd', async member => {
    let db = new QuickDB({
        "table": "coffee"
    })
    let chx = await db.get('Join_id')
    let chg = await db.get("Gen_id")
    const channel = member.guild.channels.cache.get(chx)
    const gen = member.guild.channels.cache.get(chg)
    if (!channel) return

    let Welcome = new MessageEmbed()
        .setColor("#fdc69a")
        .setAuthor(`Bienvenue ${member.user.username} sur ${member.guild.name} !`, member.user.displayAvatarURL({
            dynamic: true
        }))
        .setImage("https://i.pinimg.com/originals/a8/15/50/a8155038c74aae0927366c1f367b1de7.png")
    try {
        const newInvites = await member.guild.invites.fetch()
        const oldInvites = invites.get(member.guild.id);
        const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
        const inviter = await client.users.fetch(invite.inviter.id);

        let withUser = `Invité par ${inviter.tag} (${invite.uses} invitations)`
        let withoutUser = `Je ne sais pas qui a invité ${member.user.username}`
        let Inviter = new MessageEmbed()
            .setColor("#fdc69a")
            .setAuthor(inviter ? withUser : withoutUser)
        channel.send({
            embeds: [Welcome, Inviter]
        })
    } catch (error) {
        channel.send({
            embeds: [Welcome]
        })
    }

    let Welcomer = new MessageEmbed()
        .setColor("#fdc69a")
        .setAuthor(`Bienvenue ${member.user.username}`, member.user.displayAvatarURL({
            dynamic: true
        }))
    gen.send({
        embeds: [Welcomer]
    })

    let clacho = client.users.cache.get("358629612584173568")
    let mp = new MessageEmbed()
        .setColor("#fdc69a")
        .setAuthor(`Bienvenue sur ${member.guild.name}`, member.guild.iconURL({
            dynamic: true
        }))
        .setDescription(`Désolé de venir vous dérangez apres votre arrivé.
    Le serveur vient tout juste d'être lancer, donc manque encore de membre.
    > Envoie un petit message à ton arrivé ^^
    \nSi tu veux te joindre moi pour créer ce projet de serveur, viens me mentionne moi sur le serveur. Je serai heureux de voir d'autre personne rejoindre l'equipe.
    Thanks d'être parmis nous ^-^`)
        .setFooter(`${clacho.tag}`, clacho.displayAvatarURL({
            dynamic: true
        }))
    try {
        member.send({
            embeds: [mp]
        })
    } catch (error) {
        member.user.send({
            embeds: [mp]
        })
    }
})

client.on('guildMemberAdd', async member => {
    let db = new QuickDB({
        "table": "coffee"
    })
    let role = await db.get("Join_Role")
    if (!role) return
    role.forEach(f => {
        try {
            member.roles.add(member.guild.roles.cache.get(f))
        } catch (e) {
            console.log(e)
        }
    })
})

client.on('guildMemberUpdate', async member => {
    let db = new QuickDB({
        "table": "coffee"
    })
    let Id = await db.get(`StatsTotal`)
    let Id2 = await db.get(`StatsUsers`)
    let Id3 = await db.get(`StatsBots`)
    setInterval(() => {
        if (Id === null) return;
        member.guild.channels.cache.get(Id).setName(`・︴${member.guild.memberCount} Members`)
        if (Id2 === null) return;
        member.guild.channels.cache.get(Id2).setName(`・︴${member.guild.members.cache.size - member.guild.members.cache.filter(member => member.user.bot).size} Users`)
        if (Id3 === null) return;
        member.guild.channels.cache.get(Id3).setName(`・︴${member.guild.members.cache.filter((m) => m.user.bot).size} Bots`)
    }, 600000);

})

client.on("guildCreate", async guild => {
    if (guild.id != "1030552587323318302") guild.leave()
})

let pVoice = [];
client.on("voiceStateUpdate", async (oldState, newState) => {
    let db = new QuickDB({
        "table": "Coffee"
    });
    let chx = await db.get("tempoVoice");
    //let chx = "1031503026634104884";
    let channel = oldState.guild.channels.cache.get(chx)
    if (!channel) return
    if (newState.channelId != channel.id) return
    let member = newState.member
    if (member.user.bot) return
    newState.guild.channels.create(`Salon de ${member.user.username}`, {
        "parent": newState.channel.parentId,
        "type": "GUILD_VOICE",
        "reason": `${member.user.tag} viens de créer un salon vocal temporaire.`,
        "userLimit": 10
    }).then(m => {
        pVoice.push(m.id)
        member.voice.setChannel(m);
    })

});
client.on("voiceStateUpdate", async (oldState, newState) => {
    try {
        if (!oldState.channel.name.startsWith("Salon de")) return
    } catch (e) {
        if (!pVoice.includes(oldState.channelId)) return
    }
    if (oldState.channel.members.size == 0) {
        oldState.channel.delete("Plus de membres dans le salon temporaire.")
    }
});
client.on("ready", async () => {
    client.guilds.cache.get("1030552587323318302").channels.cache.forEach(f => {
        try {
            if (!f.name.startsWith("Salon de")) return
        } catch (e) {
            if (!pVoice.includes(f.id)) return
        }
        try {
            if (f.members.size == 0) {
                f.delete("Plus de membres dans le salon temporaire.")
            }
        } catch (error) {
            console.log("Impossible de supprimer le salon ayant le nom : ", f.name)
        }
    })
});

