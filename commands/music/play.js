const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
const config = require('../../config.js')
const { randomask } = require('../../data/ask.json');
module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {

        const random = randomask[Math.floor(Math.random() * randomask.length)]

        const helpEmbed = new MessageEmbed()
        .setThumbnail(db.get(`thumb`))
        .setImage(db.get(`banner`))
        .setColor('BLUE')
        .setFooter(`Requested by : ${message.member.user.username}!`)
        .setTitle(`** [MUSIC] | ${client.user.username} <a:dj:915231895866986556>**`)
        .addField(`**<a:here:907106477867687956> Này bạn ${message.member.user.username}**`, `**\`${random}\`**`)
// hmm e làm tiếp:>>>>>
        if (!args[0]){
        helpEmbed.setDescription(`**<a:here:907106477867687956> Please specify a songs\n<a:here:907106477867687956> Command : ${config.app.px}play [name / URL]**`)
        return message.reply({ embeds: [helpEmbed] })
        }


        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length){
            helpEmbed.setDescription(`**<a:here:907106477867687956> I can't find the songs <:deny_topgg:915231851285717003>**`)
          return message.reply({ embeds: [helpEmbed] })    
        }
        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            helpEmbed.setDescription(`**<a:here:907106477867687956> I can't join voice/stage <:deny_topgg:915231851285717003>**`)
          return message.reply({ embeds: [helpEmbed] })    
        }

        
        helpEmbed.setDescription(`**<a:here:907106477867687956> Playing ${res.playlist ? 'playlist' : 'bài hát'}... 🎧**`)
        await message.reply({ embeds: [helpEmbed] }) 
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
