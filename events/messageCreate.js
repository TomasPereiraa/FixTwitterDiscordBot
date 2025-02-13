const { PermissionsBitField } = require("discord.js");
const helpData = require("../data/helpMessage.json");
const statsCommand = require("../commands/stats");
const flipCommand = require("../commands/flip");
const userinfoCommand = require("../commands/userinfo");
const serverinfoCommand = require("../commands/serverinfo");

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

  // Handle text commands like !stats, !flip, etc.
  const commandPrefix = "!";

  if (message.content.toLowerCase() === `${commandPrefix}stats`) {
    await statsCommand(client, message);
  } else if (message.content.toLowerCase() === `${commandPrefix}flip`) {
    await flipCommand(client, message);
  } else if (message.content.toLowerCase().startsWith(`${commandPrefix}userinfo`)) {
    await userinfoCommand(client, message);
  } else if (message.content.toLowerCase() === `${commandPrefix}serverinfo`) {
    await serverinfoCommand(client, message);
  }

  // Handle the !help command
  if (message.content.toLowerCase() === `${commandPrefix}help`) {
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
