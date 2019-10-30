export interface ICurrent {
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