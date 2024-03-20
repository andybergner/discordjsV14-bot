const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Returns websocket latency'),

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    interaction.reply({
      content: `Latency: ${client.ws.ping}ms`,
      ephemeral: true,
    });
  },
};
