module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    try {
      const command = require(`../commands/${interaction.commandName}.js`);
      await command.execute(interaction);
    } catch (error) {
      console.error("Error executing command:", error);
      await interaction.reply({
        content: "There was an error executing this command.",
        ephemeral: true,
      });
    }
  } else if (interaction.isAutocomplete()) {
    try {
      if (interaction.commandName === "build") {
        const champions = require("../data/champions.json");
        const focusedValue = interaction.options.getFocused().toLowerCase();
        const filtered = champions
          .filter((c) => c.toLowerCase().startsWith(focusedValue))
          .slice(0, 10);

        await interaction.respond(
          filtered.map((champion) => ({ name: champion, value: champion }))
        );
      }
    } catch (error) {
      console.error("Error handling autocomplete:", error);
    }
  }
};
