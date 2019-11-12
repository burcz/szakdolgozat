import { Schema, Document, model } from 'mongoose';
import { IUser } from '.';

export interface INote extends Document {
	user: IUser;
	body: string;
}

const NoteSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	body: {
		type: String,
		required: true
	}
});

const NoteModel = model<INote>('Note', NoteSchema);

export {
	NoteModel
};