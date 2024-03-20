const { loadCommands } = require('../../handlers/commandHandler');

module.exports = {
  name: 'ready',
  once: true,

  async execute(interaction, client) {
    loadCommands(client);
    client.logger.info(`${client.user.username} is online!`);
  },
};
