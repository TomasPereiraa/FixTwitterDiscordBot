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

  // Regex to detect X (Twitter) links, including mobile links
  const xRegex =
    /https:\/\/(?:x\.com|twitter\.com|mobile\.twitter\.com)\/\w+\/status\/\d+/;

  if (xRegex.test(message.content)) {
    const fixedLink = message.content.replace(
      /x\.com|twitter\.com|mobile\.twitter\.com/,
      "fxtwitter.com"
    );

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

      await message.channel.send(fixedLink);
    } catch (error) {
      console.error("Failed to process message:", error);
    }
  }
});

client.login(process.env.TOKEN);
