require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load Commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
fs.readdirSync(commandsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  }
});

// Load Events
const eventsPath = path.join(__dirname, "events");
fs.readdirSync(eventsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, async (...args) => {
      try {
        await event(client, ...args);
      } catch (error) {
        console.error(`❌ Error in event: ${eventName}`, error);
      }
    });
  }
});

// Bot Ready Event
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Handle Slash Commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Error executing command: ${interaction.commandName}`, error);
    await interaction.reply({
      content: "There was an error executing this command!",
      ephemeral: true,
    });
  }
});

// Login the bot
client.login(process.env.TOKEN);
