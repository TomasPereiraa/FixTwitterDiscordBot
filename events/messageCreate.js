const { PermissionsBitField } = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  // Handle Twitter (x.com) and Instagram links
  const xRegex =
    /https:\/\/(?:x\.com|twitter\.com|mobile\.twitter\.com)\/\w+\/status\/\d+/;
  const instaRegex =
    /https:\/\/www\.instagram\.com\/(reel|p|tv|stories)\/[\w-]+/;

  let fixedMessage = message.content;

  if (xRegex.test(message.content)) {
    fixedMessage = message.content.replace(
      /x\.com|twitter\.com|mobile\.twitter\.com/g,
      "fxtwitter.com"
    );
  } else if (instaRegex.test(message.content)) {
    fixedMessage = message.content.replace(
      /www\.instagram\.com/g,
      "www.ddinstagram.com"
    );
  }

  if (fixedMessage !== message.content) {
    try {
      // Check if bot has permission to manage messages and webhooks
      if (
        message.guild &&
        message.channel
          .permissionsFor(client.user)
          .has(PermissionsBitField.Flags.ManageWebhooks) &&
        message.channel
          .permissionsFor(client.user)
          .has(PermissionsBitField.Flags.ManageMessages)
      ) {
        await message.delete();

        const webhook = await message.channel.createWebhook({
          name: message.author.username,
          avatar: message.author.displayAvatarURL({ dynamic: true }),
        });
        await webhook.send({
          content: fixedMessage,
        });
        await webhook.delete();
      } else {
        await message.channel.send(
          `**${message.author.username}:** ${fixedMessage}`
        );
      }
    } catch (error) {
      console.error("Failed to process message with webhook:", error);
    }
  }
};
