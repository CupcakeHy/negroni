import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { command } from "../utils/command.js";
import fs from 'fs';
import { Color, Reply } from "../utils/replies.js";
import { User } from "../mongodb/models/user.model.js";

const data = new SlashCommandBuilder()
	.setName('birthday')
	.setDescription('Gestiona cumpleaños')
	.addSubcommand(subcommand =>
		subcommand
			.setName('add')
			.setDescription('Añade un cumpleaños')
			.addUserOption(option =>
				option
					.setName('user')
					.setDescription('Miembro que cumple años')
					.setRequired(true)
			)
			.addIntegerOption(option =>
				option
					.setName('day')
					.setDescription('Día del cumpleaños')
					.setMinValue(1)
					.setMaxValue(31)
					.setRequired(true)
			)
			.addIntegerOption(option =>
				option
					.setName('month')
					.setDescription('Mes del cumpleaños')
					.setMinValue(1)
					.setMaxValue(12)
					.setRequired(true)
			)
	)
	.addSubcommand(subcommand =>
		subcommand
			.setName('remove')
			.setDescription('Elimina un cumpleaños')
			.addUserOption(option =>
				option
					.setName('user')
					.setDescription('Miembro a eliminar de la lista de cumpleaños')
					.setRequired(true)
			)
	)
	.addSubcommand(subcommand =>
		subcommand
			.setName('list')
			.setDescription('Lista de los cumpleaños')
	)

export default command(data, async ({ interaction }) => {
	if (interaction.options.getSubcommand() === 'add') {
		const user = interaction.options.getUser('user');
		const day = interaction.options.getInteger('day');
		const month = interaction.options.getInteger('month');

		const find = await User.findOne({ userId: user?.id });

		if (find) {
			return interaction.reply(
				Reply(`El cumpleaños de ${user} ya está añadido`, Color.Error)
			);
		}

		const registerUser = new User({
			userId: user?.id,
			displayName: user?.displayName,
			birthday: {
				day: day,
				month: month
			},
			score: 0
		});

		try {
			const data = await registerUser.save();

			if (data) {
				return interaction.reply(
					Reply(`Cumpleaños de ${user} añadido`, Color.Success)
				);
			}
		} catch (err) {
			return console.error(err);
		}
	} else if (interaction.options.getSubcommand() === 'remove') {
		const user = interaction.options.getUser('user');

		const find = await User.findOne({ userId: user?.id });

		if (find) {
			try {
				const data = await User.findOneAndDelete({ userId: user?.id });

				if (data) {
					return interaction.reply(
						Reply(`Cumpleaños de ${user} eliminado`, Color.Success)
					);
				}
			} catch (err) {
				console.error(err);
			}
		}


	} else if (interaction.options.getSubcommand() === 'list') {
		try {
			const users = await User.find();
			const usersArray = Array.from(users);

			if (users.length > 0) {
				const sortedUsers = usersArray.sort((a, b) => new Date(2000, a.birthday?.month! - 1, a.birthday?.day).getTime() - new Date(2000, b.birthday?.month! - 1, b.birthday?.day).getTime());

				const embed = new EmbedBuilder()
					.setColor(0x8742f5)
					.setTitle('Lista de cumpleaños')

				sortedUsers.forEach(user => {
					embed.addFields(
						{ name: user.displayName, value: `${user.birthday?.day}/${user.birthday?.month}` }
					)
				});

				return interaction.reply({
					embeds: [embed], ephemeral: false
				});
			}

			return interaction.reply(
				Reply(`No hay cumpleaños registrados`, Color.Error)
			);
		} catch (err) {
			console.error(err);
		}
	}
});