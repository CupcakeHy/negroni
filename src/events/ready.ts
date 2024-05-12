import { CronJob } from 'cron';
import { event, Events } from '../utils/index.js';
import Keys from '../keys.js';
import { TextChannel, User } from 'discord.js';
import fs from 'fs';

export default event(Events.ClientReady, async ({ log }, client) => {
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

	return log(`Discord bot logged in as ${client.user.username}.`);
})

