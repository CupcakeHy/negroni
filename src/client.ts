import { Client, GatewayIntentBits, Options, TextChannel, User } from 'discord.js';
import Events from './events/index.js';
import Keys from './keys.js';
import { registerEvents } from './utils/index.js';
import { CronJob } from 'cron';
import fs from 'fs';

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

var dateMonth = new Date().getMonth() + 1;
var dateDay = new Date().getDate();

const job = CronJob.from({
	cronTime: `0 0 0 * * *`,
	onTick: async function () {
		var birthdays = await JSON.parse(fs.readFileSync('./birthdays.json', 'utf8'));
		birthdays.forEach((birthday: { day: number; month: number; user: User; }) => {
			if (birthday.day == dateDay && birthday.month == dateMonth) {
				client.channels.fetch(Keys.birthdayChannel).then(
					channel => (channel as TextChannel).send(`FELIZ CUMPLE <@${birthday.user.id}>`)
				);
			}
		});
	},
	start: true,
	timeZone: 'Europe/Madrid'
});