const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue){
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
            .setColor('BLUE')
            .setTitle(`<:deny_topgg:915231851285717003> There is no songs playing`)
            .setFooter("Requested by " + message.author.username);
            return message.reply({ embeds: [helpEmbed] })
            }

        const success = queue.setPaused(false);
        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
            .setColor('BLUE')
            .setTitle(success ? ` ${queue.current.title} resumed ✅` : `Error ${message.author}... Please try again ❌`)
            .setFooter("Requested by " + message.author.username);
            return message.channel.send({ embeds: [helpEmbed] })
    },
};
