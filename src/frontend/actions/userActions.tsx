import * as axios from 'axios';
import { ThunkDispatch as Dispatch } from "redux-thunk";
import { IUsersState } from '../types';

export const GET_USERS_ACTION = 'GET_USERS_ACTION';
export type GET_USERS_ACTION = typeof GET_USERS_ACTION;

export const GET_ONE_USER_ACTION = 'GET_ONE_USER_ACTION';
export type GET_ONE_USER_ACTION = typeof GET_ONE_USER_ACTION;

export interface IGetUsersAction {
	type: GET_USERS_ACTION;
	data: IUsersState;
}

export interface IGetOneUserAction {
	type: GET_ONE_USER_ACTION;
	data: IUsersState;
}

const apiAddress = process.env.API_ADDRESS;

export function getUsers() {
	return (dispatch: Dispatch<IGetUsersAction, {}, any>) => {
		axios.default.get(apiAddress + '/api/users')
			.then(response => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error('Something went wrong ...');
				}
			})
			.then(data => {
				dispatch({
					type: GET_USERS_ACTION,
					data: {
						all: {
							users: data,
							isLoading: false
						}
					}
				})
			})
			.catch(error => {
				dispatch({
					type: GET_USERS_ACTION,
					data: {
						all: {
							error: error
						}
					}
				})
			});
	};
}

export function getUser(userId: string) {
	return (dispatch: Dispatch<IGetUsersAction, {}, any>) => {
		axios.default.get(apiAddress + '/api/user/' + userId)
			.then(response => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error('Something went wrong ...');
				}
			})
			.then(data => {
				dispatch({
					type: GET_ONE_USER_ACTION,
					data: {
						current: {
							user: data,
							isLoading: false
						}
					}
				})
			})
			.catch(error => {
				dispatch({
					type: GET_ONE_USER_ACTION,
					data: {
						current: {
							error: error
						}
					}
				})
			});
	};
}
