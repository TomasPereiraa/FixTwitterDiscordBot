const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Get information about the server."),

  async execute(interaction) {
    const guild = interaction.guild;
    const serverInfoMessage = `
Server Name: ${guild.name}
Members: ${guild.memberCount}
Owner: ${guild.ownerId}
Region: ${guild.preferredLocale}
    `;
    await interaction.reply(serverInfoMessage);
  },
};
