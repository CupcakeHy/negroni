import { Event } from '../utils/index.js';
import interactionCreate from './interactionCreate.js';
import messageCreate from './messageCreate.js';
import ready from './ready.js';

export default [
	interactionCreate,
	ready,
	messageCreate
] as Event[];