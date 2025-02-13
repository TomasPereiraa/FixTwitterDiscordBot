const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information about a user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to get information about")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const userInfoMessage = `
User Info for ${user.tag}:
- Joined: ${member.joinedAt}
- Roles: ${member.roles.cache.map((role) => role.name).join(", ")}
- Status: ${user.presence ? user.presence.status : "offline"}
    `;
    await interaction.reply(userInfoMessage);
  },
};
