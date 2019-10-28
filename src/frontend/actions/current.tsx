import { ThunkDispatch as Dispatch } from "redux-thunk";

export const AUTHENTICATE = 'AUTHENTICATE';
export type AUTHENTICATE = typeof AUTHENTICATE;

export const UNAUTHENTICATE = 'UNAUTHENTICATE';
export type UNAUTHENTICATE = typeof UNAUTHENTICATE;

import { ICurrent } from "../types";

export interface IAuthenticate {
	type: AUTHENTICATE;
}

function authenticate(): IAuthenticate {
	return {
		type: AUTHENTICATE,
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
	return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		await window.localStorage.setItem("authenticated", "true");
		dispatch(authenticate());
	};
}

export function logOut() {
	return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		await window.localStorage.setItem("authenticated", "false");
		dispatch(unauthenticate());
	};
}

export function checkAuthentication() {
	return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		const auth = await window.localStorage.getItem("authenticated");
		const formattedAuth = typeof auth === "string" ?
			JSON.parse(auth) :
			null;

		formattedAuth ? dispatch(authenticate()) : dispatch(unauthenticate());
	};
}