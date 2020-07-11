const Discord = require('discord.js');

const client = new Discord.Client()

const prefix = 'a.';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commmands/${file}`);

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
        message.channel.send('This is the list of commands: `ping` `youtube` `freerobux` `help` '); 
    }  if (!message.guild) return;

    // if the message content starts with "a.ban"
    if (message.content.startsWith('a.ban')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
           */
          member
            .ban({
              reason: 'They were bad!',
            })
            .then(() => {
              // We let the message author know we were able to ban the person
              message.reply(`Successfully banned ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to ban the member,
              // either due to missing permissions or role hierarchy
              message.reply('I was unable to ban the member');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
      } else {
        // Otherwise, if no user was mentioned
        message.reply("Who do u want to ban Kirito-kun?");
      }
    }   if (!message.guild) return;

    // If the message content starts with "!kick"
    if (message.content.startsWith('a.kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply('I was unable to kick the member');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply("Who do u want to kick Kirito-kun?");
      }
    }
  }); 

client.login(process.env.BOT_TOKEN);

