const { PermissionsBitField } = require("discord.js");
const helpData = require("../data/helpMessage.json");  
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
      if (
        message.guild &&
        message.channel
          .permissionsFor(client.user)
          .has(PermissionsBitField.Flags.ManageMessages)
      ) {
        await message.delete();
      }

      await message.channel.send(`**${message.author.username}:** ${fixedMessage}`);
    } catch (error) {
      console.error("Failed to process message:", error);
    }
  }

  // Handle !help command
  if (message.content.toLowerCase() === '!help') {
    const helpMessage = helpData.message + helpData.commands
      .map(command => `**${command.name}** - ${command.description}`)
      .join("\n");

    try {
      await message.reply(helpMessage);
    } catch (error) {
      console.error("Failed to send help message:", error);
    }
  }
};
