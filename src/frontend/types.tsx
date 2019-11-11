import { RouterState } from 'react-router-redux';
export interface ICurrentState {
	isAuthenticated: boolean | null;
	uuid: string | null;
}

export interface IUsersState {
	users: IUser[];
	isLoading: boolean;
	error: Error | null;
};

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
}

export interface INotesState {
	user: IUser,
	notes: INote[];
	isLoading: boolean;
	error: Error | null;
}

export interface INote {
	userId: string;
	body: string;
}

export interface IReducedStates {
	currentReducer: ICurrentState;
	userReducer: IUsersState,
	noteReducer: INotesState,
	router: RouterState;
}