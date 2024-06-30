import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command } from "../utils/command.js";
import { User } from "../mongodb/models/user.model.js";

const data = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('Consulta la tabla de clasificación')

export default command(data, async ({ interaction }) => {
	const users = await User.find();
	const usersArray = Array.from(users);

	if (users.length > 0) {
		const sortedUsers = usersArray.sort((a, b) => b.score - a.score);

		const embed = new EmbedBuilder()
			.setColor(0x8742f5)
			.setTitle('Tabla de clasificación de queseadas')

		var podium = 1;

		sortedUsers.forEach(user => {
			switch (podium) {
				case 1:
					embed.addFields(
						{ name: podium > 0 ? `🥇${user.displayName}` : `${user.displayName}`, value: `Queseadas: ${user.score}` }
					);
					podium++;
					break;

				case 2:
					embed.addFields(
						{ name: podium > 0 ? `🥈${user.displayName}` : `${user.displayName}`, value: `Queseadas: ${user.score}` }
					);
					podium++;
					break;

				case 3:
					embed.addFields(
						{ name: podium > 0 ? `🥉${user.displayName}` : `${user.displayName}`, value: `Queseadas: ${user.score}` }
					);
					podium++;
					break;

				default:
					embed.addFields(
						{ name: podium > 0 ? `${user.displayName}` : `${user.displayName}`, value: `Queseadas: ${user.score}` }
					);
					break;
			}
		});

		return interaction.reply({
			embeds: [embed], ephemeral: false
		});
	}
});