const moment = require("moment");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  // Handle userinfo command
  if (message.content.toLowerCase().startsWith('!userinfo')) {
    // Get the user mentioned or the author if no one is mentioned
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);

    const userInfoMessage = `
\`\`\`plaintext
User Info for ${user.tag}:
- Joined: ${moment(member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}
- Roles: ${member.roles.cache.map(role => role.name).join(", ")}
- Status: ${user.presence ? user.presence.status : "offline"}
\`\`\`
    `;

    try {
      await message.reply(userInfoMessage);
    } catch (error) {
      console.error("Failed to send userinfo message:", error);
    }
  }
};
