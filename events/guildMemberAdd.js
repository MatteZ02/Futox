module.exports = {
  run: async (param) => {
    console.log('member added');
    const { futox, Discord, member } = param;
    const d = futox.global.db.guilds[member.guild.id];
    if (d.channels.member_logs) {
      const embed = new Discord.RichEmbed()
        .setTitle('User Joined')
        .setDescription(member.user)
        .setColor(futox.colors.botGold)
      member.guild.channels.get(d.channels.member_logs).send(embed);
    }
    if (!member.user.bot) {
      console.log('here');
      if (d.roles.member) {
        let role0 = member.guild.roles.get(d.roles.member);
        member.addRole(role0.id);
      }
      if (d.channels.welcome) {
        console.log('welcome');
        if (d.channels.rules) {
          member.guild.channels.get(d.channels.welcome).send(`${member}, Welcome to **${member.guild.name}**! Please make sure you\'ve read the <#${d.channels.rules}>`);
        } else {
          member.guild.channels.get(d.channels.welcome).send(`Welcome to **${member.guild.name}**, ${member}!`);
        }
      }
    } else {
      if (d.roles.bot) {
        let role2 = member.guild.roles.get(d.roles.bot);
        member.addRole(role2.id);
      }
    }
  },
};