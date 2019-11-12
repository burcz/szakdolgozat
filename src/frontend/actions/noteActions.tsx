import * as axios from 'axios';
import { ThunkDispatch as Dispatch } from "redux-thunk";
import { INotesState } from '../types';

export const GET_USER_NOTES_ACTION = 'GET_USER_NOTES_ACTION';
export type GET_USER_NOTES_ACTION = typeof GET_USER_NOTES_ACTION;

export const CREATE_NOTE_ACTION = 'CREATE_NOTE_ACTION';
export type CREATE_NOTE_ACTION = typeof CREATE_NOTE_ACTION;

export interface IGeUserNotesAction {
	type: GET_USER_NOTES_ACTION;
	data: INotesState;
}

const apiAddress = process.env.API_ADDRESS;

export function getNotesForUser(userId: string) {
	return (dispatch: Dispatch<IGeUserNotesAction, {}, any>) => {
		axios.default.get(apiAddress + '/api/user/' + userId + '/notes')
		.then(response => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error('Something went wrong ...');
			}
		})
		.then(data => {
			dispatch({
				type: GET_USER_NOTES_ACTION,
				data: {
					notes: data,
					isLoading: false
				}
			})
		})
		.catch(error => {
			dispatch({
				type: GET_USER_NOTES_ACTION,
				data: {
					error: error
				}
			})
		});
	};
}

export function createNote(userId: string, noteBody: string) {
	return (dispatch: Dispatch<IGeUserNotesAction, {}, any>) => {
		axios.default.post(apiAddress + '/api/note', {
			userId: userId,
			body: noteBody
		})
		.then(response => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error('Something went wrong ...');
			}
		})
		.then(data => {
			dispatch({
				type: CREATE_NOTE_ACTION
			})
		})
		.catch(error => {
			dispatch({
				type: CREATE_NOTE_ACTION,
				data: {
					error: error
				}
			})
		});
	};
}