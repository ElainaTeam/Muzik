const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,
    execute(client, message, args) {
        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setFooter(`Requested by : ${message.member.user.username}!`)
        .setTitle(`** [MUSIC] | ${client.user.username} <a:dj:915231895866986556>**`)
        const queue = player.getQueue(message.guild.id);
        if (!queue){
           helpEmbed.setDescription(`**<a:here:907106477867687956> There is no song playing <:deny_topgg:915231851285717003>**`)
            return message.reply({ embeds: [helpEmbed] })
        }
        const success = queue.setPaused(true)
        helpEmbed.setDescription(`**<a:here:907106477867687956>**` + `**${success}**` ? `**Songs ${queue.current.title} Stopped ✅**` : `**error ${message.author}... Please try agian ❌**`)
            return message.channel.send({ embeds: [helpEmbed] })
    },
};
