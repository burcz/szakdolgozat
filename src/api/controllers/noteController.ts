import { NoteModel, INote, IUser, UserModel } from '../models';
import { context } from 'exceptional.js';

const EXCEPTIONAL = context('users');

interface ICreateNoteInput {
	userId: IUser['_id'];
	body: INote['body'];
}

interface IUpdateNoteInput {
	user?: IUser;
	body?: INote['body'];
}

async function createNote({
	userId,
	body
}: ICreateNoteInput): Promise<INote> {
	const user = await UserModel.findById(userId);
	if (user) {
		const note = await NoteModel.create({
			user,
			body
		});
		return note;
	}
	else {
		throw EXCEPTIONAL.NotFoundException(1, { message: `User not found by id: ${ userId }` });
	}
}

async function getNote(noteId: INote['_id']) {
	const note = await NoteModel.findById(noteId);
	return note;
}

async function updateNote(noteId: INote['_id'], update: IUpdateNoteInput): Promise<INote | null> {
	const noteToUpdate = await NoteModel.findByIdAndUpdate(noteId, update);
	if (noteToUpdate) {
		const updatedNote = await NoteModel.findById(noteToUpdate._id);
		return updatedNote;
	}
	return null;
}

async function deleteNote(noteId: INote['_id']) {
	const note = await NoteModel.findByIdAndDelete(noteId);
	return note;
}

async function getAllNotes() {
	const notes = await NoteModel.find();
	return notes;
}

async function getNotesWithUser(userId: IUser['_id']): Promise<INote[]> {
	const foundNotesWithUser = await NoteModel.find({
		user: userId
	});
	return foundNotesWithUser;
}

export {
	createNote,
	getNote,
	updateNote,
	deleteNote,
	getAllNotes,
	getNotesWithUser
};