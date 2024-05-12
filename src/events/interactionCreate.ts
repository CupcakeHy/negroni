import { Color, Command, event, Events, Reply } from '../utils/index.js';
import commands from '../commands/index.js';

const commandMap = new Map<string, Command>(commands.map(cmd => [cmd.meta.name, cmd]));

export default event(Events.InteractionCreate, ({ log, client }, interaction) => {
  if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

  try {
    const commandName = interaction.commandName;
    const command = commandMap.get(commandName);

    if (!command) {
      throw new Error(`Could not resolve the command with name "${commandName}"`);
    }

    return command.callback({ client, log, interaction });
  } catch (error) {
    log('[ERROR]:', error);

    if (interaction.deferred || interaction.replied) {
      return interaction.followUp(
        Reply("An error occured while executing this command.", Color.Error)
      );
    }

    return interaction.reply(
      Reply("An error occured while executing this command!", Color.Error)
    );
  }
});
