import * as express from 'express';
import connect from './dataBase/connect';
import { userRoutes } from './routes';

const app = express();
const port = 3000;

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.listen(port, () =>
	console.log(`Application started successfully on port ${port}.`)
);
const db = `mongodb://${process.env.DB_HOST}:27017/test`;
connect({ db });
userRoutes({ app });