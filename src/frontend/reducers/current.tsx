import {
	IAuthenticate,
	IUnauthenticate,
	AUTHENTICATE,
	UNAUTHENTICATE
} from "../actions/current";
import { ICurrent } from "../types";

export default function currentReducer(
	state: ICurrent = {
		uuid: null,
		isAuthenticated: null,
	},
	action: IAuthenticate | IUnauthenticate,
): ICurrent {
	switch (action.type) {
		case AUTHENTICATE:
			return { ...state, uuid: action.data, isAuthenticated: true };
		case UNAUTHENTICATE:
			return { uuid: null, isAuthenticated: false }
	}
	return state;
}