module.exports = async (client, message) => {
  if (message.author.bot) return;

  // Handle flip command
  if (message.content.toLowerCase() === '!flip') {
    const flipResult = Math.random() < 0.5 ? "Heads" : "Tails";

    const flipMessage = `
\`\`\`plaintext
You flipped: ${flipResult}
\`\`\`
    `;

    try {
      await message.reply(flipMessage);
    } catch (error) {
      console.error("Failed to send flip message:", error);
    }
  }
};
