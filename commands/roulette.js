const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Load roulette color data at startup
const rouletteData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/roulette.json"), "utf-8")
);

const cooldowns = new Map();
const COOLDOWN_TIME = 5000; // 5 seconds cooldown per user

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roulette")
    .setDescription(
      "Spin the roulette and optionally bet on a number, even/odd, or a color!"
    )
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("Choose a number (0-36)")
        .setMinValue(0)
        .setMaxValue(36)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("evenorodd")
        .setDescription("Bet on even or odd")
        .addChoices(
          { name: "Even", value: "even" },
          { name: "Odd", value: "odd" }
        )
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Bet on red, black, or green")
        .addChoices(
          { name: "Red", value: "red" },
          { name: "Black", value: "black" },
          { name: "Green", value: "green" }
        )
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const userId = interaction.user.id;
    const betNumber = interaction.options.getInteger("number");
    const betEvenOrOdd = interaction.options.getString("evenorodd");
    const betColor = interaction.options.getString("color");

    // Cooldown check
    if (cooldowns.has(userId)) {
      const lastUsed = cooldowns.get(userId);
      const timeSinceLastUse = Date.now() - lastUsed;
      if (timeSinceLastUse < COOLDOWN_TIME) {
        return interaction.editReply({
          content: `⏳ You must wait ${
            (COOLDOWN_TIME - timeSinceLastUse) / 1000
          }s before spinning again!`,
        });
      }
    }
    cooldowns.set(userId, Date.now());

    // Spin roulette
    const rolledNumber = Math.floor(Math.random() * 37); // 0 to 36
    const rolledColor = rouletteData[rolledNumber.toString()] || "Unknown";
    const isEven =
      rolledNumber !== 0 && rolledNumber % 2 === 0 ? "even" : "odd";

    let resultMessage = `🎰 **Roulette Spin** 🎰\n🎲 **${rolledNumber} - ${
      rolledColor === "Red"
        ? "🔴 Red"
        : rolledColor === "Black"
        ? "⚫ Black"
        : "🟢 Green"
    } - ${isEven.toUpperCase()}**\n`;

    let winMessages = [];
    let loseMessages = [];

    // Number Bet
    if (betNumber !== null) {
      if (betNumber === rolledNumber) {
        winMessages.push("🏆 **Exact Number Win!**");
      } else {
        loseMessages.push("❌ **Number Bet Lost!**");
      }
    }

    // Even/Odd Bet
    if (betEvenOrOdd) {
      if (betEvenOrOdd === isEven) {
        winMessages.push("✅ **Correct Even/Odd!**");
      } else {
        loseMessages.push("❌ **Even/Odd Bet Lost!**");
      }
    }

    // Color Bet
    if (betColor) {
      if (betColor === rolledColor.toLowerCase()) {
        winMessages.push("✅ **Correct Color Guess!**");
      } else {
        loseMessages.push("❌ **Color Bet Lost!**");
      }
    }

    // Format final message
    if (winMessages.length > 0) {
      resultMessage += `\n${winMessages.join("\n")}`;
    }
    if (loseMessages.length > 0) {
      resultMessage += `\n${loseMessages.join("\n")}`;
    }

    // If no bets were placed
    if (!betNumber && !betEvenOrOdd && !betColor) {
      resultMessage += "\n💭 **You didn't place a bet, just spun the wheel!**";
    }

    const embed = new EmbedBuilder()
      .setColor(
        rolledColor === "Red"
          ? "#ff0000"
          : rolledColor === "Black"
          ? "#000000"
          : "#00ff00"
      )
      .setTitle("🎰 Roulette Result")
      .setDescription(resultMessage)
      .setFooter({ text: "Good luck next time!" })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};
