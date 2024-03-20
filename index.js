const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { loadEvents } = require("./src/bot/handlers/eventHandler");
const RedisCache = require("./src/private/redisCache");

const client = new Client({
  intents: Object.keys(GatewayIntentBits),
  partials: Object.keys(Partials),
});

client.config = require("./config.json");
client.commands = new Collection();
client.events = new Collection();
client.cache = new RedisCache();

client
  .login(client.config.DISCORD_TOKEN)
  .then(() => {
    console.info("Successfully connected to Discord!");
    loadEvents(client);
  })
  .catch((error) => {
    console.error("Something went wrong while connecting to Discord.");
    console.error(error);
  });

process.on("unhandledRejection", (error) => {
  console.error(`Rejection: ${error}${error && error.stack ? `\n${error.stack}` : ""}`);
});
process.on("uncaughtException", (error) => {
  console.error(`Uncaught exception: ${error}${error.stack ? `\n${error.stack}` : ""}`);
  process.exit(1);
});
process.on("warning", (error) => {
  console.debug(`${error}${error.stack ? `\n${error.stack}` : ""}`);
});
