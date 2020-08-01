const Discord = require('discord.js');

const client = new Discord.Client()

const ms = require('ms')

const prefix = 'a.';

const fs = require('fs');
const { execute } = require('./commands/yes');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Asuna is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!')
    } else if (command == 'youtube'){
        message.channel.send('https://www.youtube.com/channel/UCNXDu4rROvN8r25c2TMAoCw');
    } else if (command == 'freerobux'){
        message.channel.send('no');
    } else if (command == 'help'){
        message.channel.send('This is the list of commands: ```ping, bruh, kiss, sorry, yes, youtube, dumb, kill, hug, tea, freerobux, help, shut, av``` '); 
    } else if (command == 'shut'){
       const user = message.mentions.users.first(); 
        message.channel.send(`Shut the fuck up ${user.tag}`);
    } else if (command == 'av'){
        message.reply(message.author.displayAvatarURL());
    } else if (command == 'yes'){
        client.commands.get('yes').execute(message, args);
    } else if (command == 'kill'){
        client.commands.get('im ash').execute(message, args);
    } else if (command == 'hug'){
        client.commands.get('hug').execute(message, args);
    } else if (command == 'sorry'){
        client.commands.get('hug').execute(message, args);
    } else if (command == 'tea'){
        client.commands.get('tea').execute(message, args);
    } else if (command == 'kiss'){
        client.commands.get('kiss').execute(message, args);
    } else if (command == 'bruh'){
        client.commands.get('bruh').execute(message, args);
    } else if (command == 'dumb'){
        client.commands.get('dumb').execute(message, args);
    } else if (command == 'obli'){
        client.commands.get('obli').execute(message, args);
    } else if (command == 'slap'){
        client.commands.get('slap').execute(message, args);      
    }
      if (!message.guild) return;
 
  }); 

client.login('NzMxMDg0NTc5MjA0NjI4NTMw.XwrgUA.VqrOybNXUmcqf1vSSrNKXOtWmoE');

