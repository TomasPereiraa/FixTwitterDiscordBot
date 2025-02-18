const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Load roulette data once at startup
const rouletteData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/roulette.json"), "utf-8")
);

const cooldowns = new Map(); // Track cooldowns
const COOLDOWN_TIME = 5000; // 5 seconds cooldown per user

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription(
      "Spin the roulette and bet on a number, color, even, or odd!"
    )
    .addStringOption((option) =>
      option
        .setName("bet")
        .setDescription(
          "Choose a number (0-36), a color (red, black, green), or even/odd"
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const bet = interaction.options.getString("bet")?.toLowerCase();
    const number = Math.floor(Math.random() * 37).toString(); // 0 to 36
    const color = rouletteData[number] || "Unknown";
    const isEven =
      parseInt(number) % 2 === 0 && number !== "0" ? "even" : "odd";

    // Cooldown check
    if (cooldowns.has(userId)) {
      const lastUsed = cooldowns.get(userId);
      const timeSinceLastUse = Date.now() - lastUsed;
      if (timeSinceLastUse < COOLDOWN_TIME) {
        return interaction.reply({
          content: `⏳ You must wait ${
            (COOLDOWN_TIME - timeSinceLastUse) / 1000
          }s before spinning again!`,
          ephemeral: true,
        });
      }
    }
    cooldowns.set(userId, Date.now());

    // Determine win/loss if the user placed a bet
    let resultMessage = `🎰 **Roulette Spin** 🎰\n🎲 **${number} - ${color} - ${isEven.toUpperCase()}**`;
    if (bet) {
      if (bet === number) {
        resultMessage += "\n✅ **You won! You hit the exact number!**";
      } else if (bet === color) {
        resultMessage += "\n✅ **You won! You guessed the correct color!**";
      } else if (bet === isEven) {
        resultMessage +=
          "\n✅ **You won! You guessed the correct even/odd outcome!**";
      } else {
        resultMessage += "\n❌ **You lost! Better luck next time!**";
      }
    }

    // Create an embedded message
    const embed = new EmbedBuilder()
      .setColor(
        color === "Red" ? "#ff0000" : color === "Black" ? "#000000" : "#00ff00"
      )
      .setTitle("🎰 Roulette Result")
      .setDescription(resultMessage)
      .setFooter({ text: "Good luck next time!" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
