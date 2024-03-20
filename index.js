const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { loadEvents } = require('./src/bot/handlers/eventHandler');

const client = new Client({
  intents: Object.keys(GatewayIntentBits),
  partials: Object.keys(Partials),
});

client.logger = new (require('./src/logger'))();
client.config = require('./config.json');
client.commands = new Collection();
client.events = new Collection();

client
  .login(client.config.DISCORD_TOKEN)
  .then(() => {
    client.logger.info('Successfully connected to Discord!');
    loadEvents(client);
  })
  .catch((error) => {
    client.logger.error('Something went wrong while connecting to Discord.');
    client.logger.error(error);
  });

process.on('unhandledRejection', (error) => {
  client.logger.error(`Rejection: ${error}${error && error.stack ? `\n${error.stack}` : ''}`);
});
process.on('uncaughtException', (error) => {
  client.logger.error(`Uncaught exception: ${error}${error.stack ? `\n${error.stack}` : ''}`);
  process.exit(1);
});
process.on('warning', (error) => {
  client.logger.debug(`${error}${error.stack ? `\n${error.stack}` : ''}`);
});
