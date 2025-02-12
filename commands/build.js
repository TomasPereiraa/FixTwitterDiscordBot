const { SlashCommandBuilder } = require("discord.js");
const champions = require("../data/champions.json"); // List of valid champions

module.exports = {
  data: new SlashCommandBuilder()
    .setName("build")
    .setDescription("Get build links for a League of Legends champion")
    .addStringOption((option) =>
      option
        .setName("champion")
        .setDescription("Name of the champion")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async execute(interaction) {
    const championInput = interaction.options
      .getString("champion")
      .toLowerCase();
    const champion = champions.find((c) => c.toLowerCase() === championInput);

    if (!champion) {
      return interaction.reply({
        content: `❌ Champion **${championInput}** not found!`,
        ephemeral: true,
      });
    }

    const uggLink = `https://u.gg/lol/champions/${champion}/build`;
    const opggLink = `https://www.op.gg/champions/${champion}/build`;

    return interaction.reply(
      `🔗 **Build links for ${champion}**\n[U.GG](${uggLink})\n[OP.GG](${opggLink})`
    );
  },
};
