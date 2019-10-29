import * as axios from 'axios';
import { ThunkDispatch as Dispatch } from "redux-thunk";

export const GET_USERS_ACTION = 'GET_USERS_ACTION';
export type GET_USERS_ACTION = typeof GET_USERS_ACTION;

export interface IGetUsers {
	type: GET_USERS_ACTION;
}

export function getUsers() {
	return (dispatch: Dispatch<IGetUsers, {}, any>) => {
		axios.default.get('http://localhost:3000/api/users')
			.then(response => {
				if (response.status === 200) {
					dispatch({
						type: GET_USERS_ACTION,
						data: response.data.json()
					})
				} else {
					throw new Error('Something went wrong ...');
				}
			})
			// .then(data => this.setState({ users: data.users, isLoading: false }))
			// .catch(error => this.setState({ error, isLoading: false }));
	};
}
