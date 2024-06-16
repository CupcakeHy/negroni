import { CronJob } from 'cron';
import { event, Events } from '../utils/index.js';
import fs from 'fs';
import Keys from '../keys.js';
import { ChannelType, User } from 'discord.js';

export default event(Events.ClientReady, async ({ log }, client) => {
	const job = CronJob.from({
		cronTime: `0 0 0 * * *`,
		onTick: async function () {
			const dateMonth = new Date().getMonth() + 1;
			const dateDay = new Date().getDate();
	
			var birthdays = await JSON.parse(fs.readFileSync('./birthdays.json', 'utf8'));
			birthdays.forEach((birthday: { day: number; month: number; user: User; }) => {
				if (birthday.day == dateDay && birthday.month == dateMonth) {
					try {
						const channel = client.channels.cache.get(Keys.birthdayChannel);
	
						if (channel?.type === ChannelType.GuildText) {
							channel.send(`FELIZ CUMPLE <@${birthday.user.id}>`)
						}
					} catch (err) {
						console.error(err);
					}
				}
			});
		},
		start: true,
		timeZone: 'Europe/Madrid'
	});
	
	return log(`Discord bot logged in as ${client.user.username}.`);
})

