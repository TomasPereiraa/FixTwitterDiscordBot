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
      "Spin the roulette and optionally bet on a number, even/odd, and/or color!"
    )
    .addStringOption((option) =>
      option
        .setName("number")
        .setDescription("Choose a number (0-36)")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("evenorodd")
        .setDescription("Bet on even or odd")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Bet on red, black, or green")
        .setRequired(false)
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    const betNumber = interaction.options.getString("number")?.toLowerCase();
    const betEvenOrOdd = interaction.options
      .getString("evenorodd")
      ?.toLowerCase();
    const betColor = interaction.options.getString("color")?.toLowerCase();

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

    // Determine win/loss
    let resultMessage = `🎰 **Roulette Spin** 🎰\n🎲 **${number} - ${color} - ${isEven.toUpperCase()}**`;
    let wonBet = false;

    if (betNumber && betNumber === number) {
      resultMessage += "\n✅ **You won! You hit the exact number!**";
      wonBet = true;
    }
    if (betEvenOrOdd && betEvenOrOdd === isEven) {
      resultMessage +=
        "\n✅ **You won! You guessed the correct even/odd outcome!**";
      wonBet = true;
    }
    if (betColor && betColor === color.toLowerCase()) {
      resultMessage += "\n✅ **You won! You guessed the correct color!**";
      wonBet = true;
    }
    if (!wonBet && (betNumber || betEvenOrOdd || betColor)) {
      resultMessage += "\n❌ **You lost! Better luck next time!**";
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
