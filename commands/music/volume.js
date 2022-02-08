const maxVol = client.config.opt.maxVol;
const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
        // return message.channel.send(`:x: No music currently playing ${message.author}`);
        helpEmbed.setDescription(`**<a:here:907106477867687956> There is no song playing <:deny_topgg:915231851285717003>**`)
        return message.reply({ embeds: [helpEmbed] })
        }

        const vol = parseInt(args[0]);

        if (!vol) {
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
            .setColor('BLUE')
            .setTitle(`Volume ${queue.volume} <a:settings:915489052940189726>\n*Volume from **1** to **${maxVol}**.*`)
            .setFooter("Requested by " + message.author.username);
            return message.channel.send({ embeds: [helpEmbed] })
        }
        if (queue.volume === vol) {
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
            .setColor('BLUE')
            .setTitle(`<:deny_topgg:915231851285717003> You changing it to the same volume right now <a:settings:915489052940189726>`)
            .setFooter("Requested by " + message.author.username);
            return message.channel.send({ embeds: [helpEmbed] })
        }
        if (vol < 0 || vol > maxVol) {
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
            .setColor('BLUE')
            .setTitle(`<:deny_topgg:915231851285717003> Error.Please choose from **1** to **${maxVol}** `)
            .setFooter("Requested by " + message.author.username);
            return message.channel.send({ embeds: [helpEmbed] })
        }
        const success = queue.setVolume(vol);
        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
            .setColor('BLUE')
            .setTitle(success ? `Changed the volume **${vol}**/**${maxVol}**% 🔊` : `:x: Error `)
            .setFooter("Requested by " + message.author.username);
            return message.channel.send({ embeds: [helpEmbed] })
    },
};
