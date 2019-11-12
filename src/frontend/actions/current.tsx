import { ThunkDispatch as Dispatch } from "redux-thunk";

export const AUTHENTICATE = 'AUTHENTICATE';
export type AUTHENTICATE = typeof AUTHENTICATE;

export const UNAUTHENTICATE = 'UNAUTHENTICATE';
export type UNAUTHENTICATE = typeof UNAUTHENTICATE;

export interface IAuthenticate {
	type: AUTHENTICATE;
	data: string | null;
}

function authenticate(): IAuthenticate {
	return {
		type: AUTHENTICATE,
		data: window.localStorage.getItem('userId')
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

export function logIn(userId: string) {
	return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		window.localStorage.setItem("authenticated", "true");
		window.localStorage.setItem("userId", userId); //TODO remove hardcode
		dispatch(authenticate());
	};
}

export function logOut() {
	return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
		window.localStorage.setItem("authenticated", "false");
		window.localStorage.setItem("userId", "");
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