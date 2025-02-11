const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("goat")
    .setDescription("Get LeBron James' stats from last game and his last 5-game average!"),
  
  async execute(interaction) {
    try {
      // Fetch LeBron's Player ID from API
      const playerResponse = await axios.get("https://www.balldontlie.io/api/v1/players/237");
      const playerId = playerResponse.data.id;

      // Fetch last 5 games' stats
      const statsResponse = await axios.get(
        `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&per_page=5`
      );
      
      const games = statsResponse.data.data;

      if (!games.length) {
        return await interaction.reply("No stats available for LeBron's last game. 🏀");
      }

      // Get the most recent game stats
      const lastGame = games[0];

      // Calculate averages over the last 5 games
      let totalPoints = 0, totalRebounds = 0, totalAssists = 0;
      let totalFGM = 0, totalFGA = 0, totalFG3M = 0, totalFG3A = 0;
      let totalFTM = 0, totalFTA = 0, totalSteals = 0, totalBlocks = 0;

      games.forEach(game => {
        totalPoints += game.pts;
        totalRebounds += game.reb;
        totalAssists += game.ast;
        totalFGM += game.fgm;
        totalFGA += game.fga;
        totalFG3M += game.fg3m;
        totalFG3A += game.fg3a;
        totalFTM += game.ftm;
        totalFTA += game.fta;
        totalSteals += game.stl;
        totalBlocks += game.blk;
      });

      const avgPoints = (totalPoints / 5).toFixed(1);
      const avgRebounds = (totalRebounds / 5).toFixed(1);
      const avgAssists = (totalAssists / 5).toFixed(1);
      const avgFGM = (totalFGM / 5).toFixed(1);
      const avgFGA = (totalFGA / 5).toFixed(1);
      const avgFG3M = (totalFG3M / 5).toFixed(1);
      const avgFG3A = (totalFG3A / 5).toFixed(1);
      const avgFTM = (totalFTM / 5).toFixed(1);
      const avgFTA = (totalFTA / 5).toFixed(1);
      const avgSteals = (totalSteals / 5).toFixed(1);
      const avgBlocks = (totalBlocks / 5).toFixed(1);

      // Format response
      const statsMessage = `
      🏀 **LeBron James' Last Game Stats** 🏀
      📅 Date: ${lastGame.game.date}
      📊 Points: **${lastGame.pts}**
      🏀 Rebounds: **${lastGame.reb}**
      🎯 Assists: **${lastGame.ast}**
      🏹 Field Goals: **${lastGame.fgm}/${lastGame.fga}**
      🎯 3-Point: **${lastGame.fg3m}/${lastGame.fg3a}**
      🎯 Free Throws: **${lastGame.ftm}/${lastGame.fta}**
      🛑 Steals: **${lastGame.stl}**
      🔥 Blocks: **${lastGame.blk}**
      
      📊 **Last 5 Games Averages** 📊
      🔥 Points: **${avgPoints}**
      🏀 Rebounds: **${avgRebounds}**
      🎯 Assists: **${avgAssists}**
      🏹 FG%: **${avgFGM}/${avgFGA}**
      🎯 3PT%: **${avgFG3M}/${avgFG3A}**
      🎯 FT%: **${avgFTM}/${avgFTA}**
      🛑 Steals: **${avgSteals}**
      🔥 Blocks: **${avgBlocks}**
      `;

      await interaction.reply(statsMessage);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      await interaction.reply("Could not retrieve LeBron's stats. Try again later! 🏀");
    }
  },
};
