import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Template configuration
app.set("view engine", "ejs");
app.set("views", "public");

// Static files configuration
app.use("/assets", express.static(path.join(__dirname, "../views")));
app.use('/favicon.ico', express.static(path.join(__dirname, '../../public/favicon.ico')));

app.get('/', (req: express.Request, res: express.Response) =>
	res.render("index")
);

app.listen(port, () =>
	console.log(`Application started successfully on port ${port}.`)
);