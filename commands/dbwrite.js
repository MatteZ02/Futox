module.exports = {
	name: 'dbwrite',
	usage: '',
	description: 'Write cached information to database',
	category: 'utility',
  async execute(msg, args, client, Discord) {
    if (!client.global.core_devs.map(x => x.id).includes(msg.author.id)) return msg.channel.send(client.global.replies.notAllowed);
    client.guilds.forEach(async guild => {
      await client.db.collection('guilds').doc(guild.id).set(client.global.db.guilds[guild.id]);
    });
    for (let i = 0; i < Object.keys(client.global.db.specs).length; i++) {
      await client.db.collection('specs').doc(Object.keys(client.global.db.specs)[i]).set(Object.values(client.global.db.specs)[i]);
    }
    client.global.dbwrite.lastAttempt = { success: true, timestamp: Date.now(), };
    client.global.dbwrite.unsavedChanges = false;
    msg.channel.send('Done!');
  },
};