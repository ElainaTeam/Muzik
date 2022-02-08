const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'clearmusic',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {

        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setFooter(`Requested by : ${message.member.user.username}!`)
        .setTitle(`** [MUSIC] | ${client.user.username} <a:dj:915231895866986556>**`)
        // .setDescription(`**<a:here:907106477867687956> text_here <:deny_topgg:915231851285717003>**`)
        
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
        helpEmbed.setDescription(`**<a:here:907106477867687956> There is no song playing <:deny_topgg:915231851285717003>**`)
        return message.reply({ embeds: [helpEmbed] })
        }
        if (!queue.tracks[0]){
            helpEmbed.setDescription(`**<a:here:907106477867687956> This is the last song in the queue <:deny_topgg:915231851285717003>**`)
        return message.reply({ embeds: [helpEmbed] })
        }

        await queue.clear();
        embed.setDescription(`**<a:here:907106477867687956> Removed the songs 🗑️**`)

        return message.reply({ embeds: [helpEmbed] })
    },
};
