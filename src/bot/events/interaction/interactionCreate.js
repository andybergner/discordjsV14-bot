const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return interaction.reply({
          content: "Outdated command! Please check in later.",
          ephemeral: true,
        });
      }

      if (command.developer && interaction.user.id != client.config.developer)
        return interaction.reply({
          content: "This command is only avaiable to the Developer!",
          ephemeral: true,
        });

      if (command.maintenance && interaction.user.id != client.config.developer) {
        return interaction.reply({
          content: "Command is currently under maintenance! Please check in later.",
          ephemeral: true,
        });
      }

      command.execute(interaction, client);
    }
  },
};
