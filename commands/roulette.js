const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("Spin the roulette and get a number with color!"),
  async execute(interaction) {
    const colors = ["Red", "Black", "Green"];
    const number = Math.floor(Math.random() * 37); // 0-36
    const color = number === 0 ? "Green" : colors[Math.floor(Math.random() * 2)];

    await interaction.reply(`🎰 Rolling...\n🎲 ${number} - ${color}`);
  },
};
