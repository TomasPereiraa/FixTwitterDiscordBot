const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  // Handle stats command
  if (message.content.toLowerCase() === '!stats') {
    const uptime = moment.duration(client.uptime).humanize();
    const commandCount = client.commandCount || 0; // Store the command count, initialize to 0

    // Increment command count whenever a command is used
    client.commandCount = commandCount + 1;

    const statsMessage = new MessageEmbed()
      .setTitle("Bot Stats")
      .addField("Uptime", uptime)
      .addField("Commands Used", commandCount)
      .addField("Server Count", client.guilds.cache.size)
      .addField("User Count", client.users.cache.size)
      .setColor("#00FF00");

    try {
      await message.reply({ embeds: [statsMessage] });
    } catch (error) {
      console.error("Failed to send stats message:", error);
    }
  }
};
