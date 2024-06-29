import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	displayName: { type: String, required: true },
	birthday: {
		day: { type: Number, required: true, min: 1, max: 31 },
		month: { type: Number, required: true, min: 1, max: 12 }
	},
	score: { type: Number, min: 0 }
});

export const User = mongoose.model('User', UserSchema);