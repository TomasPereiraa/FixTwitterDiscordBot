const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flip")
    .setDescription("Flip a coin and get heads or tails."),

  async execute(interaction) {
    const result = Math.random() > 0.5 ? "Heads" : "Tails";
    await interaction.reply(`🎲 **Coin Flip**: ${result}`);
  },
};
