import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
	email: string;
	firstName: string;
	lastName: string;
}

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	}
});

const UserModel = model<IUser>('User', UserSchema);

export {
	UserModel
};