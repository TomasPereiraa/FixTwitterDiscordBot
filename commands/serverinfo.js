const moment = require("moment");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  // Handle serverinfo command
  if (message.content.toLowerCase() === '!serverinfo') {
    const server = message.guild;

    const serverInfoMessage = `
\`\`\`plaintext
Server Info for ${server.name}:
- Created: ${moment(server.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
- Members: ${server.memberCount}
- Owner: ${server.owner.user.tag}
- Region: ${server.region}
\`\`\`
    `;

    try {
      await message.reply(serverInfoMessage);
    } catch (error) {
      console.error("Failed to send serverinfo message:", error);
    }
  }
};
