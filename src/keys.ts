import { getEnvVar } from "./utils/index.js";

export const Keys = {
	token: getEnvVar('TOKEN'),
	guild: getEnvVar('GUILD'),
	birthdayChannel: getEnvVar('BIRTHDAY_CHANNEL')
} as const;

export default Keys;