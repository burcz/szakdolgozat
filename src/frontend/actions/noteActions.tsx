import * as axios from 'axios';
import { ThunkDispatch as Dispatch } from "redux-thunk";
import { INotesState, INote} from '../types';

export const GET_USER_NOTES_ACTION = 'GET_USER_NOTES_ACTION';
export type GET_USER_NOTES_ACTION = typeof GET_USER_NOTES_ACTION;

export interface IGeUserNotesAction {
	type: GET_USER_NOTES_ACTION;
	data: INotesState;
}

export function getNotesForUser() {
	return (dispatch: Dispatch<IGeUserNotesAction, {}, any>) => {
		axios.default.get('http://localhost:3000/api/user/' + window.localStorage.getItem('userId') + '/notes')
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
					type: GET_USER_NOTES_ACTION
				})
			});
	};
}
