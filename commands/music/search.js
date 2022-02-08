const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');
const db = require("quick.db")
module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
                .setColor('BLUE')
                .setTitle(`<:deny_topgg:915231851285717003> Please specify a songs ${message.author}`)
                .setFooter("Requested by " + message.author.username);
                return message.channel.send({ embeds: [helpEmbed] });
        }
        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) {
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
                .setColor('BLUE')
                .setTitle(`<:deny_topgg:915231851285717003> No results ${message.author}`)
                .setFooter("Requested by " + message.author.username);
                return message.channel.send({ embeds: [helpEmbed] });
        }
        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();
        embed.setThumbnail(db.get(`thumb`))
        embed.setImage(db.get(`banner`))

        embed.setColor('BLUE');
        embed.setAuthor(`Kết quả cho ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);
        embed.setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nFrom **1** and **${maxTracks.length}** or **cancel** ⬇️`);

        embed.setTimestamp();
       

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Cancel search ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`:x: Sai kìa, thử chọn từ **1** và **${maxTracks.length}** hoặc **hủy**`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                const helpEmbed = new MessageEmbed()
                .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
                .setColor('BLUE')
                .setTitle(`I can't join voice/stage, ${message.author}`)
                .setFooter("Requested by " + message.author.username);
                return message.channel.send({ embeds: [helpEmbed] });
            }
            //hảo hán
            const helpEmbed = new MessageEmbed()
            .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
                .setColor('BLUE')
                .setTitle(`Loading... 🎧`)
                .setFooter("Requested by " + message.author.username);
                await message.channel.send({ embeds: [helpEmbed] });
            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') {
                const helpEmbed = new MessageEmbed()
                .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
                .setColor('BLUE')
                .setTitle(`<:deny_topgg:915231851285717003> Timeout ${message.author}`)
                .setFooter("Requested by " + message.author.username);
                return message.channel.send({ embeds: [helpEmbed] });
            }
        });
    },
};
