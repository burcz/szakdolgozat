import * as axios from 'axios';
import { ThunkDispatch as Dispatch } from "redux-thunk";
import { IUsersState } from '../types';

export const GET_USERS_ACTION = 'GET_USERS_ACTION';
export type GET_USERS_ACTION = typeof GET_USERS_ACTION;

export interface IGetUsersAction {
	type: GET_USERS_ACTION;
	data: IUsersState;
}

export function getUsers() {
	return (dispatch: Dispatch<IGetUsersAction, {}, any>) => {
		axios.default.get('http://localhost:3000/api/users')
			.then(response => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error('Something went wrong ...');
				}
			})
			.then(data => {
				window.localStorage.setItem('users', data);
				window.localStorage.setItem('isLoading', "false");
				dispatch({
					type: GET_USERS_ACTION
				})
			})
			.catch(error => {
				window.localStorage.setItem('error', error);
				window.localStorage.setItem('isLoading', "false");
				dispatch({
					type: GET_USERS_ACTION
				})
			});
	};
}
