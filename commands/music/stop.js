const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'stop',
    aliases: ['dc'],
    utilisation: '{prefix}stop',
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

        queue.destroy();
        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setTitle(`Turned off music ✅`)
        .setFooter("Requested by " + message.author.username);
        return message.channel.send({ embeds: [helpEmbed] })
    },
};
