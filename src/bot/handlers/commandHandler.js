function loadCommands(client) {
  const ascii = require('ascii-table');
  const fs = require('fs');
  const table = new ascii().setHeading('Commands', 'Status');

  let commandsArray = [];

  const commandsFolder = fs.readdirSync('./src/Bot/Commands');
  client.commands.clear();

  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./src/Bot/Commands/${folder}`)
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);

      const properties = { folder, ...commandFile };
      client.commands.set(commandFile.data.name, properties);

      commandsArray.push(commandFile.data.toJSON());

      table.addRow(file, 'loaded');
    }
  }

  client.application.commands.set(commandsArray);
  return process.stdout.write(`${table.toString()} \n`);
}
module.exports = { loadCommands };
