require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Ignore bot messages

  // Regex to detect Twitter/X links
  const xRegex =
    /https:\/\/(?:x\.com|twitter\.com|mobile\.twitter\.com)\/\w+\/status\/\d+/;

  // Regex to detect Instagram reel links
  const instaRegex =
    /https:\/\/www\.instagram\.com\/(reel|p|tv|stories)\/[\w-]+/;

  let fixedMessage = message.content;

  if (xRegex.test(message.content)) {
    // Replace Twitter/X links with fxtwitter.com
    fixedMessage = message.content.replace(
      /x\.com|twitter\.com|mobile\.twitter\.com/g,
      "fxtwitter.com"
    );
  } else if (instaRegex.test(message.content)) {
    // Replace Instagram links with ddinstagram.com
    fixedMessage = message.content.replace(
      /www\.instagram\.com/g,
      "www.ddinstagram.com"
    );
  }

  if (fixedMessage !== message.content) {
    try {
      // Check if the bot has permission to delete messages
      if (
        message.guild &&
        message.channel
          .permissionsFor(client.user)
          .has(PermissionsBitField.Flags.ManageMessages)
      ) {
        await message.delete();
      } else {
        console.warn("Bot lacks permission to delete messages.");
      }

      // Repost the message with the author's username
      await message.channel.send(
        `**${message.author.username}:** ${fixedMessage}`
      );
    } catch (error) {
      console.error("Failed to process message:", error);
    }
  }
});

client.login(process.env.TOKEN);
