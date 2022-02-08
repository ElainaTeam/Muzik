const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
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
        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send(`Playing live music 🎧`);
        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setTitle(`${progress} (**${timestamp.progress}**%)`)
        .setFooter("Requested by " + message.author.username);
        return message.channel.send({ embeds: [helpEmbed] })
    },
};
