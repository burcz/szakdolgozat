import * as React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import { bindActionCreators } from 'redux';

import Nav from "../components/NavBar";
import Pages from "../routes/Pages";
import { checkAuthentication } from "../actions/current";
import { ICurrent } from "../types";
import history from "../history";

import * as config from '../../config.json';



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

const mapStateToProps = (state) => (
	(config.reducer) ? 
	{ isAuthenticated: state.currentReducer.isAuthenticated } :
	{ isAuthenticated: state.isAuthenticated }
);

// const mapDispatchToProps = {
// 	checkAuthenticationConnect: checkAuthentication
// };

function mapDispatchToProps(dispatch) {
	return {
		checkAuthentication: bindActionCreators(checkAuthentication, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
