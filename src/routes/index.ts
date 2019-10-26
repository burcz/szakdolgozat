import { TRoutesInput } from '../types/routes';
import { userController } from '../controllers';

export default ({ app }: TRoutesInput) => {
	app.post('/api/user', async (req, res) => {
		const user = await userController.createUser({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		});

		return res.send({ user });
	});
};