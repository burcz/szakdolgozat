import {
	GET_USERS_ACTION,
	IGetUsersAction
} from '../actions/userActions';

import { IUsersState } from '../types';

const initialState = {
	users: [],
	isLoading: true,
	error: null
};

export default function userReducer(
	state: IUsersState = initialState,
	action: IGetUsersAction,
): IUsersState {
	switch (action.type) {
		case GET_USERS_ACTION:
			state = action.data;
	}
	return state;
}