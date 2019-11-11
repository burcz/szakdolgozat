import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import history from '../history';
import { IReducedStates } from '../types';

interface IProps {
	exact?: boolean;
	isAuthenticated: boolean | null;
	path: string;
	component: React.ComponentType<any>;
}

const LoggedInRoute = ({
	component: Component,
	isAuthenticated,
	...otherProps
}: IProps) => {
	if (isAuthenticated === false) {
		history.push("/log-in");
		console.log("this is a logged in route, you are logged out, redirected to log in");
	}

	return (
		<>
			<header>
				Logged In Header
      </header>
			<Route
				render={otherProps => (
					<>
						<Component {...otherProps} />
					</>
				)}
			/>
			<footer>
				Logged In Footer
      </footer>
		</>
	);
};

const mapStateToProps = (state: IReducedStates) => ({
	isAuthenticated: state.currentReducer.isAuthenticated
});

export default connect(
	mapStateToProps
)(LoggedInRoute);