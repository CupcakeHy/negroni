import { event, Events } from "../utils/event.js";

export default event(Events.MessageCreate, async ({ log, client }, message) => {
	if (['qué', 'qe', 'que', 'khe', 'khé', 'ke', 'ké'].some(str => message.content.toLowerCase().replace(/[\.,?¿!"-_*]/g, '').endsWith(str))) {
		message.reply('so');
	}
});