const { QueueRepeatMode } = require('discord-player');
const db = require("quick.db")
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {

        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setFooter(`Requested by : ${message.member.user.username}!`)
        .setTitle(`** [MUSIC] | ${client.user.username} <a:dj:915231895866986556>**`)

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            helpEmbed.setDescription(`**<a:here:907106477867687956> There is no songs playing <:deny_topgg:915231851285717003>**`)
        return message.reply({ embeds: [helpEmbed] })
        }

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) {
                helpEmbed.setDescription(`**<:deny_topgg:915231851285717003> You have to turn off the loop in the current song (${client.config.app.px}loop) ${message.author}**`)
                return message.channel.send({
                    embeds : [helpEmbed]
                });
            }

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.ON);
            helpEmbed.setDescription(`**${success}**` ? `**🔁 Loop ${queue.repeatMode === 0 ? '\`Đã bật\`' : '\`Đã tắt\`'} All the songs in the queue will loop**` : `**<:deny_topgg:915231851285717003> Lỗi rồi kìa ${message.author}**`)
            return message.reply({ embeds: [helpEmbed] })
        } else {
            if (queue.repeatMode === 2) {
                helpEmbed.setDescription(`**<:deny_topgg:915231851285717003> Turn off the current queue in loop mode (${client.config.app.px}loop queue) ${message.author}**`)
                return message.channel.send({
                    embeds : [helpEmbed]
                });
            }

            
            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
            helpEmbed.setDescription(`**🔁 ${success}**` ? `**Loop ${queue.repeatMode === 0 ? '\`Đã tắt\`' : '\`Đã tắt\`'} The songs will now loop 🔂**` : `**<:deny_topgg:915231851285717003> Lỗi rồi kìa ${message.author}**`)
            return message.reply({ embeds: [helpEmbed] })
        };
    },
};
