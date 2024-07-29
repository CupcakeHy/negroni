import { CronJob } from 'cron';
import { event, Events } from '../utils/index.js';
import fs from 'fs';
import Keys from '../keys.js';
import { ChannelType } from 'discord.js';
import { User } from '../mongodb/models/user.model.js';

export default event(Events.ClientReady, async ({ log }, client) => {
	const job = CronJob.from({
		cronTime: `0 0 0 * * *`,
		onTick: async function () {
			const date = new Date();
			date.setFullYear(2000);
			date.setHours(0, 0, 0, 0);

			const user = await User.findOne({ birthday: date });

			if (user) {
				try {
					const channel = client.channels.cache.get(Keys.birthday_channel);

					if (channel?.type === ChannelType.GuildText) {
						channel.send(`FELIZ CUMPLE <@${user.userId}>`)
					}
				} catch (err) {
					console.error(err);
				}
			}
		},
		start: true,
		runOnInit: true,
		timeZone: 'Europe/Madrid'
	});

	return log(`Discord bot logged in as ${client.user.username}.`);
})

