import { UserModel, IUser } from '../models';

interface ICreateUserInput {
	email: IUser['email'];
	firstName: IUser['firstName'];
	lastName: IUser['lastName'];
}

async function createUser({
	email,
	firstName,
	lastName
}: ICreateUserInput): Promise<IUser> {
	const user = await UserModel.create({
		email,
		firstName,
		lastName
	});
	return user;
}

export {
	createUser
};