const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information about a user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    // Get presence safely
    let status = "Offline"; // Default
    if (member?.presence) {
      const statusMap = {
        online: "🟢 Online",
        idle: "🌙 Idle",
        dnd: "🔴 Do Not Disturb",
        offline: "⚫ Offline",
      };
      status = statusMap[member.presence.status] || "⚫ Offline";
    }

    const embed = new EmbedBuilder()
      .setColor("#00ff99")
      .setTitle(`👤 User Info: ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "🆔 User ID", value: user.id, inline: true },
        {
          name: "📅 Joined Server",
          value: member?.joinedAt?.toDateString() || "Unknown",
          inline: true,
        },
        {
          name: "🎭 Roles",
          value: member?.roles.cache.map((r) => r.name).join(", ") || "None",
          inline: true,
        },
        {
          name: "🛠 Account Created",
          value: user.createdAt.toDateString(),
          inline: true,
        },
        { name: "🌐 Status", value: status, inline: true }
      )
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
