import { event, Events } from "../utils/event.js";

export default event(Events.MessageCreate, async ({ log, client }, message) => {
	if (['qué', 'qe', 'que', 'ke', 'ké'].some(str => message.content.toLowerCase().replace(/[\.,?!]/g, '').endsWith(str))) {
		message.reply('so');
	}
});