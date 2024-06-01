import { event, Events } from '../utils/index.js';

export default event(Events.ClientReady, async ({ log }, client) => {
	return log(`Discord bot logged in as ${client.user.username}.`);
})

