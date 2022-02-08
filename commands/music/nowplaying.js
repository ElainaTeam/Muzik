const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require("quick.db")

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {

        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setFooter(`Requested by : ${message.member.user.username}!`)
        .setTitle(`** [MUSIC] | ${client.user.username} <a:dj:915231895866986556>**`)

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            helpEmbed.setTitle(`<:deny_topgg:915231851285717003> There is no songs playing`)
        return message.reply({ embeds: [helpEmbed] })
        }

        const track = queue.current;

        helpEmbed.setColor('BLUE');
        helpEmbed.setThumbnail(track.thumbnail);
        helpEmbed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        helpEmbed.setDescription(`Volume **${queue.volume}**%\nLength **${trackDuration}**\nLoop **${methods[queue.repeatMode]}**\nYêu cầu bởi ${track.requestedBy}`);

        helpEmbed.setTimestamp();

        const saveButton = new MessageButton();

        saveButton.setLabel('Save this songs');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [helpEmbed], components: [row] });
    },
};
