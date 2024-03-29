import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from "../pages/Home";
import Landing from "../pages/Landing";
import LogIn from "../pages/LogIn";
import LogOut from "../pages/LogOut";
import Users from '../pages/Users';
import Notes from '../pages/Notes';

import LoggedInRoute from '../routes/LoggedInRoute';
import LoggedOutRoute from '../routes/LoggedOutRoute';

const Pages = () => {
	return (
		<Switch>
			<LoggedOutRoute path="/" exact={true} component={Landing} />
			<LoggedOutRoute path="/log-in" exact={true} component={LogIn} />
			<LoggedInRoute path="/log-out" exact={true} component={LogOut} />
			<LoggedInRoute path="/home" exact={true} component={Home} />
			<LoggedInRoute path="/users" exact={true} component={Users} />
			<LoggedInRoute path="/notes" exact={true} component={Notes} />
		</Switch>
	);
};

export default Pages;