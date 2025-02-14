const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Get information about the server."),

  async execute(interaction) {
    const guild = interaction.guild;

    const embed = new EmbedBuilder()
      .setColor("#ff9900")
      .setTitle(`🌍 Server Info: ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: "👑 Owner", value: `<@${guild.ownerId}>`, inline: true },
        {
          name: "📅 Created On",
          value: guild.createdAt.toDateString(),
          inline: true,
        },
        { name: "👥 Members", value: `${guild.memberCount}`, inline: true },
        {
          name: "💬 Text Channels",
          value: `${guild.channels.cache.filter((c) => c.type === 0).size}`,
          inline: true,
        },
        {
          name: "🎤 Voice Channels",
          value: `${guild.channels.cache.filter((c) => c.type === 2).size}`,
          inline: true,
        },
        { name: "🚀 Boost Level", value: `${guild.premiumTier}`, inline: true },
        {
          name: "🛡 Verification",
          value: `${guild.verificationLevel}`,
          inline: true,
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
