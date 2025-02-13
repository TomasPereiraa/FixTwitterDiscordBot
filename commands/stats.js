const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("View bot statistics."),

  async execute(interaction) {
    const uptime = moment.duration(interaction.client.uptime).humanize();
    const statsMessage = `
Bot Uptime: ${uptime}
Server Count: ${interaction.client.guilds.cache.size}
User Count: ${interaction.client.users.cache.size}
    `;
    await interaction.reply(statsMessage);
  },
};
