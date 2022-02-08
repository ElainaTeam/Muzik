const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {

      const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setFooter(`Requested by : ${message.member.user.username}!`)
        .setTitle(`** [MUSIC] | ${client.user.username} <a:dj:915231895866986556>**`)

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
        // return message.channel.send(`:x: No music currently playing ${message.author}`);
        helpEmbed.setDescription(`**<a:here:907106477867687956> There is no song playing right now <:deny_topgg:915231851285717003>**`)
        return message.reply({ embeds: [helpEmbed] })
        }

        if (!queue.previousTracks[1]){
        
        helpEmbed.setTitle(`**<a:here:907106477867687956> There is no song played before <:deny_topgg:915231851285717003>**`)
          return message.reply({ embeds: [helpEmbed] })    
        }

        await queue.back();
        helpEmbed.setDescription(`**<a:here:907106477867687956> I'm replay the songs**`)
          return message.reply({ embeds: [helpEmbed] })    
    },
};
