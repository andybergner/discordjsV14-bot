const { loadCommands } = require("../../handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,

  async execute(interaction, client) {
    loadCommands(client);
    console.info(`${client.user.username} is online!`);
  },
};
