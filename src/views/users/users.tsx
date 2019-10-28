import React from "react";
import ReactDOM from "react-dom";
import NavBar from '../_mainParts/NavBar';
import UsersTable from '../users/UsersTable';
import Example from './Register';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<NavBar />,
	document.getElementById("navbar"),
);

ReactDOM.render(
	<UsersTable />,
	document.getElementById("users"),
);

ReactDOM.render(
	<Example />,
	document.getElementById("register"),
);