const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("View bot statistics."),

  async execute(interaction) {
    const uptime = moment.duration(interaction.client.uptime).humanize();
    const ping = interaction.client.ws.ping;
    const serverCount = interaction.client.guilds.cache.size;
    const userCount = interaction.client.users.cache.size;

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("📊 Bot Statistics")
      .addFields(
        { name: "⏳ Uptime", value: uptime, inline: true },
        { name: "📡 Ping", value: `${ping}ms`, inline: true },
        { name: "🌍 Servers", value: `${serverCount}`, inline: true },
        { name: "👥 Users", value: `${userCount}`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
