const { SlashCommandBuilder } = require("discord.js");
const rouletteData = require("../data/roulette.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription("Spin the roulette and get a real number with color!"),

  async execute(interaction) {
    const number = Math.floor(Math.random() * 37).toString(); // 0 to 36
    const color = rouletteData[number] || "Unknown";
    await interaction.reply(
      `🎰 **Roulette Spin** 🎰\n🎲 **${number} - ${color}**`
    );
  },
};
