import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	displayName: { type: String, required: true },
	birthday: { type: Date, required: true },
	score: { type: Number, min: 0, default: 0 }
});

export const User = mongoose.model('User', UserSchema);