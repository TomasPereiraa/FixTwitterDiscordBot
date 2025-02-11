module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
  
    const command = require(`../commands/${interaction.commandName}.js`);
    if (command) {
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error("Error executing command:", error);
        await interaction.reply({
          content: "There was an error executing this command.",
          ephemeral: true,
        });
      }
    }
  };
  
