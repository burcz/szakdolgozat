import { TRoutesInput } from '../types/routes';
import { userController, noteController } from '../controllers';


export default ({ app }: TRoutesInput) => {
	// Create user
	app.post('/api/user', async (req, res) => {
		const user = await userController.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		});

		return res.send({ user });
	});

	// Get user
	app.get('/api/user/:userId', async (req, res) => {
		const user = await userController.getUser(req.params.userId);
		return res.send({ user });
	});

	// Update user
	app.put('/api/user/:userId', async (req, res, next) => {
		try {
			const updatedUser = await userController.updateUser(req.params.userId, req.body);
			return res.send({ updatedUser });
		}
		catch (err) {
			return next(err);
		}
	});

	// Delete user
	app.delete('/api/user/:userId', async (req, res) => {
		const deletedUser = await userController.deleteUser(req.params.userId);
		return res.send({ deletedUser });
	});

	// Get all users
	app.get('/api/users', async (req, res) => {
		const users = await userController.getAllUsers();
		return res.send({ users });
	});

	app.get('/api/user/:userId/notes', async (req, res) => {
		const notes = await noteController.getNotesWithUser(req.params.userId);
		return res.send({ notes });
	});
};