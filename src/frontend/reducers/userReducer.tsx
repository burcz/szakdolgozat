import {
	GET_USERS_ACTION,
	IGetUsersAction,
	GET_ONE_USER_ACTION,
	IGetOneUserAction
} from '../actions/userActions';

import { IUsersState } from '../types';

const initialState = {
	all:{
		users: [],
		isLoading: true,
		error: null
	},
	current: {
		user: null,
		isLoading: true,
		error: null
	}
};

export default function userReducer(
	state: IUsersState = initialState,
	action: IGetUsersAction | IGetOneUserAction,
): IUsersState {
	switch (action.type) {
		case GET_USERS_ACTION:
		case GET_ONE_USER_ACTION:
			state = Object.assign(state, action.data);
			break;
	}
	return state;
}