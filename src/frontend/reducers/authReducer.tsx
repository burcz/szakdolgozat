import {
	IAuthenticate,
	IUnauthenticate,
	AUTHENTICATE,
	UNAUTHENTICATE
} from "../actions/authActions";
import { IAuthState } from "../types";

export default function authReducer(
	state: IAuthState = {
		uuid: null,
		isAuthenticated: null,
	},
	action: IAuthenticate | IUnauthenticate,
): IAuthState {
	switch (action.type) {
		case AUTHENTICATE:
			return { ...state, uuid: action.data, isAuthenticated: true };
		case UNAUTHENTICATE:
			return { uuid: null, isAuthenticated: false }
	}
	return state;
}