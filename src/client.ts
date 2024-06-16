import { Client, GatewayIntentBits } from 'discord.js';
import Events from './events/index.js';
import Keys from './keys.js';
import { registerEvents } from './utils/index.js';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	]
});

registerEvents(client, Events);

client.login(Keys.token)
	.catch((err) => {
		console.error("[ERROR]:", err);
		process.exit(1);
	});