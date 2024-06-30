import { User } from "../mongodb/models/user.model.js";
import { event, Events } from "../utils/event.js";

export default event(Events.MessageCreate, async ({ log, client }, message) => {
	if (['qué', 'qe', 'que', 'khe', 'khé', 'ke', 'ké'].some(str => message.content.toLowerCase().replace(/[!¿¡"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').endsWith(str))) {
		switch (roll(100)) {
			case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
				await User.findOneAndUpdate({ userId: message.author.id }, { $inc: { score: 1 } });
				message.reply('so');
				break;

			case 11: case 12: case 13: case 14: case 15:
				await User.findOneAndUpdate({ userId: message.author.id }, { $inc: { score: 3 } });
				message.reply('sadilla');
				break;

			case 16:
				await User.findOneAndUpdate({ userId: message.author.id }, { $inc: { score: 5 } });
				message.reply('# SO RALLADO');
				break;
		}
	}
});

function roll(num: number): number {
	const roll = 1 + Math.floor(Math.random() * num)
	console.log(roll);
	return roll;
}