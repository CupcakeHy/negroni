import { REST, Routes, APIUser } from 'discord.js';
import Keys from '../keys.js';

import commands from '../commands/index.js';

const body = commands.map(cmd => cmd.meta);

const rest = new REST({ version: '10' }).setToken(Keys.token);

async function main() {
	const currentUser = await rest.get(Routes.user()) as APIUser;

	const endpoint = process.env.NODE_ENV === 'production'
		? Routes.applicationCommands(currentUser.id)
		: Routes.applicationGuildCommands(currentUser.id, Keys.guild);

	await rest.put(endpoint, { body });

	return currentUser;
}

main()
	.then(user => {
		const tag = `${user.username}#${user.discriminator}`;
		const response = process.env.NODE_ENV === 'production'
			? `Deployed ${commands.length} commands globally as ${tag}.`
			: `Deployed ${commands.length} commands to ${Keys.guild} as ${tag}.`;

		console.log(response);
	})
	.catch(console.error);
