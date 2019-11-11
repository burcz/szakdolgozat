import { UserModel, IUser } from '../models';

interface ICreateUserInput {
	email: IUser['email'];
	firstName: IUser['firstName'];
	lastName: IUser['lastName'];
}

interface IUpdateUserInput {
	firstName?: IUser['firstName'];
	lastName?: IUser['lastName'];
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

async function getUser(userId: IUser['_id']): Promise<IUser | null> {
	const user = await UserModel.findById(userId);
	return user;
}

async function updateUser(userId: IUser['_id'], update: IUpdateUserInput): Promise<IUser | null> {
	const userToUpdate = await UserModel.findByIdAndUpdate(userId, update);
	if (userToUpdate) {
		const updatedUser = await UserModel.findById(userToUpdate._id);
		return updatedUser;
	}
	return null;
}

async function deleteUser(userId: IUser['_id']): Promise<IUser | null> {
	const userToDelete = await UserModel.findById(userId);
	if (userToDelete) {
		await UserModel.deleteOne(userToDelete);
	}
	return userToDelete;
}

async function getAllUsers(): Promise<IUser[]> {
	const users = await UserModel.find();
	return users;
}


export {
	createUser,
	getUser,
	updateUser,
	deleteUser,
	getAllUsers
};