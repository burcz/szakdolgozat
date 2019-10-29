import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';



import About from "../pages/About";
import Home from "../pages/Home";
import Landing from "../pages/Landing";
import LogIn from "../pages/users/LogIn";
import LogOut from "../pages/users/LogOut";
import Users from '../pages/users/Main';
import NotFound from "../pages/NotFound";
import Terms from "../pages/Terms";

import LoggedInRoute from '../routes/LoggedInRoute';
import LoggedOutRoute from '../routes/LoggedOutRoute';


const Pages = () => {
	return (
		<Switch>
			<LoggedOutRoute path="/" exact={true} component={Landing} />
			<LoggedOutRoute path="/about" exact={true} component={About} />
			<LoggedOutRoute path="/log-in" exact={true} component={LogIn} />
			<LoggedInRoute path="/log-out" exact={true} component={LogOut} />
			<LoggedInRoute path="/home" exact={true} component={Home} />
			<LoggedInRoute path="/users" exact={true} component={Users} />
			<Route path="/terms" exact={true} component={Terms} />
			<Route component={NotFound} />
		</Switch>
	);
};

export default Pages;