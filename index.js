require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load Events
const eventsPath = path.join(__dirname, "events");
fs.readdirSync(eventsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => event(client, ...args));
  }
});

// Login the bot
client.login(process.env.TOKEN);
