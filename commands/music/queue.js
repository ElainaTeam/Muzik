const { MessageEmbed } = require('discord.js');
const db = require("quick.db")

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue){
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
            .setColor('BLUE')
            .setTitle(`<:deny_topgg:915231851285717003> There is no song playing`)
            .setFooter("Requested by " + message.author.username);
            return message.reply({ embeds: [helpEmbed] })
            }

        if (!queue.tracks[0])
        
        return message.channel.send(`<:deny_topgg:915231851285717003> There is no songs in the queue ${message.author}`);

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        embed.setColor('BLUE');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`queue - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Yêu cầu bởi : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Và **${songs - 5}** other song(s)...` : `queue **${songs}**...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
