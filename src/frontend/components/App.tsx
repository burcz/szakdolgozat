import * as React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import { bindActionCreators } from 'redux';

import Nav from "../components/NavBar";
import Pages from "../routes/Pages";
import { checkAuthentication } from "../actions/authActions";
import { IReducedStates } from "../types";
import history from "../history";

interface IProps {
	checkAuthentication: () => void;
	isAuthenticated: boolean | null;
}

const App = ({
	checkAuthentication,
	isAuthenticated
}: IProps) => {
	React.useEffect(() => {
		checkAuthentication();
	}, []);

	const app = isAuthenticated !== null ? (
		<Router history={history}>
			<Nav />
			<Route component={Pages} />
		</Router>
	) : null;

	return (
		<div className="App">
			{app}
		</div>
	);
}

const mapStateToProps = (state: IReducedStates) => (
	{ isAuthenticated: state.authReducer.isAuthenticated }
);

function mapDispatchToProps(dispatch) {
	return {
		checkAuthentication: bindActionCreators(checkAuthentication, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
