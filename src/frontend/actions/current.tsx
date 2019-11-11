import { ThunkDispatch as Dispatch } from "redux-thunk";

export const AUTHENTICATE = 'AUTHENTICATE';
export type AUTHENTICATE = typeof AUTHENTICATE;

export const UNAUTHENTICATE = 'UNAUTHENTICATE';
export type UNAUTHENTICATE = typeof UNAUTHENTICATE;

import { ICurrent } from "../types";

export interface IAuthenticate {
	type: AUTHENTICATE;
	data: string;
}

function authenticate(): IAuthenticate {
	return {
		type: AUTHENTICATE,
		data: 'fele'
	};
}

export interface IUnauthenticate {
	type: UNAUTHENTICATE;
}

function unauthenticate(): IUnauthenticate {
	return {
		type: UNAUTHENTICATE,
	};
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function logIn() {
	return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		window.localStorage.setItem("authenticated", "true");
		dispatch(authenticate());
	};
}

export function logOut() {
	return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		window.localStorage.setItem("authenticated", "false");
		dispatch(unauthenticate());
	};
}

export function checkAuthentication() {
	return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		const auth = window.localStorage.getItem("authenticated");
		const formattedAuth = typeof auth === "string" ?
			JSON.parse(auth) :
			null;

		formattedAuth ? dispatch(authenticate()) : dispatch(unauthenticate());
	};
}