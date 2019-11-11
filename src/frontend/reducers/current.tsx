import {
	IAuthenticate,
	IUnauthenticate,
	AUTHENTICATE,
	UNAUTHENTICATE
} from "../actions/current";
import { ICurrentState } from "../types";

export default function currentReducer(
	state: ICurrentState = {
		uuid: null,
		isAuthenticated: null,
	},
	action: IAuthenticate | IUnauthenticate,
): ICurrentState {
	switch (action.type) {
		case AUTHENTICATE:
			return { ...state, uuid: action.data, isAuthenticated: true };
		case UNAUTHENTICATE:
			return { uuid: null, isAuthenticated: false }
	}
	return state;
}