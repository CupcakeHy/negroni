import { Client, GatewayIntentBits } from 'discord.js';
import Events from './events/index.js';
import Keys from './keys.js';
import { registerEvents } from './utils/index.js';
import mongoose from 'mongoose';

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

const guild = client.guilds.cache.get("1086719720331423825");
guild?.commands.set([]);
client.application?.commands


// Connect to MongoDB database
async function connectToMongoDB(connectionString: string) {
	await mongoose.connect(connectionString);
	console.log('Connected to MongoDB database.');
}

try {
	await connectToMongoDB(Keys.mongodb_uri);
} catch (err) {
	console.log('Error connecting to MongoDB: ', err);
}