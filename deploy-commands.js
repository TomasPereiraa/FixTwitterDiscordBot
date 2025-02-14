require("dotenv").config(); // Load .env file

const { Client, GatewayIntentBits, REST } = require("discord.js");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const path = require("path");

const { CLIENT_ID, TOKEN } = process.env; // No GUILD_ID needed for global commands

const commands = [];
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing global (/) commands...");

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("✅ Successfully registered global commands!");
  } catch (error) {
    console.error("❌ Error deploying commands:", error);
  }
})();
