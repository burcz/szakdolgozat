import * as express from 'express';
import * as bodyParser from 'body-parser';
import connect from './dataBase/connect';
import { userRoutes, noteRoutes } from './routes';

import * as exceptional from 'exceptional.js';

const app = express();
const port = 3000;

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});


app.use(bodyParser());

const db = process.env.DB_PORT ?
	`mongodb://${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }` :
	`mongodb://${ process.env.DB_HOST }/${ process.env.DB_NAME }`;

connect({ db });
userRoutes({ app });
noteRoutes({ app });

app.use(function defaultErrorHandler(err, req, res, next) {
	try {
		const httpEx = new exceptional.HttpException(err);
		res.status(httpEx.statusCode).json(httpEx.error);
	}
	catch (err) {
		res.status(500).end();
	}
	next();
});

app.listen(port, () =>
	console.log(`Application started successfully on port ${ port }.`)
);