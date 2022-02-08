const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setTitle(`<:deny_topgg:915231851285717003> There is no song playing`)
        .setFooter("Requested by " + message.author.username);
        return message.reply({ embeds: [helpEmbed] })
        }

        const success = queue.skip();

        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setTitle(success ? `${queue.current.title} skipped ✅` : `:x: Error ${message.author}`)
        .setFooter("Requested by " + message.author.username);
        return message.channel.send({ embeds: [helpEmbed] })
    },
};
