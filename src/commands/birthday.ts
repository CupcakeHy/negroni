import { EmbedBuilder, SlashCommandBuilder, TextChannel, User } from "discord.js";
import { command } from "../utils/command.js";
import fs from 'fs';
import { Color, Reply } from "../utils/replies.js";

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

		var birthdays = JSON.parse(fs.readFileSync('./birthdays.json', 'utf8'));

		var find = birthdays.find((o: { user: User | null; }) => o.user?.id === user?.id)

		if (find) {
			return interaction.reply(
				Reply(`El cumpleaños de ${user} ya está añadido`, Color.Error)
			);
		}

		var birthday = {
			user: user,
			day: day,
			month: month,
			job: `* * * ${day} ${month} *`
		}

		birthdays.push(birthday);

		fs.writeFileSync('./birthdays.json', JSON.stringify(birthdays, null, 2), 'utf8');

		return interaction.reply(
			Reply(`Cumpleaños de ${user} añadido`, Color.Success)
		);
	} else if (interaction.options.getSubcommand() === 'remove') {
		const user = interaction.options.getUser('user');

		var birthdays = JSON.parse(fs.readFileSync('./birthdays.json', 'utf8'));

		var find = birthdays.find((o: { user: User | null; }) => o.user?.id === user?.id);

		if (find) {
			birthdays.splice(find, 1);

			fs.writeFileSync('./birthdays.json', JSON.stringify(birthdays, null, 2), 'utf8');

			return interaction.reply(
				Reply(`Cumpleaños de ${user} eliminado`, Color.Success)
			);
		}

		return interaction.reply(
			Reply(`El cumpleaños de ${user} no está añadido`, Color.Error)
		);
	} else if (interaction.options.getSubcommand() === 'list') {
		var birthdays = JSON.parse(fs.readFileSync('./birthdays.json', 'utf8'));

		const embed = new EmbedBuilder()
			.setColor(0x8742f5)
			.setTitle('Lista de cumpleaños')

		birthdays.forEach((birthday: { user: { globalName: string; }; day: number; month: number; }) => {
			embed.addFields(
				{ name: birthday.user.globalName, value: `${birthday.day}/${birthday.month}` }
			)
		});

		interaction.reply({ embeds: [embed], ephemeral: false });
	}
});