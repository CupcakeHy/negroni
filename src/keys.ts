import { getEnvVar } from "./utils/index.js";

export const Keys = {
	token: getEnvVar('TOKEN'),
	guild: getEnvVar('GUILD'),
	birthday_channel: getEnvVar('BIRTHDAY_CHANNEL'),
	mongodb_uri: getEnvVar('MONGODB_URI')
} as const;

export default Keys;