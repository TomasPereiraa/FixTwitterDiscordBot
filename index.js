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

// Function to Load Events
const handleEvents = () => {
  const eventsPath = path.join(__dirname, "events");
  fs.readdirSync(eventsPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const event = require(`./events/${file}`);
      const eventName = path.parse(file).name; 
      client.on(eventName, async (...args) => {
        try {
          await event(client, ...args);
        } catch (error) {
          console.error(`❌ Error in event: ${eventName}`, error);
        }
      });
    }
  });
};

handleEvents(); // Load all events

// Login the bot
client.login(process.env.TOKEN);
