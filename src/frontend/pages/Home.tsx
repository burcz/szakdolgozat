import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { IUser } from "../types";

import * as userActions from '../actions/userActions';

interface IProps {
	getUser: (userId: string) => void;
	current: {
		user: IUser;
		isLoading: boolean | null;
		error: Error | null;
	}
}

const Home = ({
	getUser,
	current
}: IProps) => {
	React.useEffect(() => {
		const userId = window.localStorage.getItem("userId");
		if (userId) {
			getUser(userId);
		}
	}, []);

	if (current.error) {
		return <p>{current.error.message}</p>;
	}
	if (current.isLoading) {
		return <p>Loading ...</p>;
	}
	return (
		<p>{JSON.stringify(current.user, null, 2)} </p>
	);
}

function mapStateToProps(state) {
	return {
		current: state.userReducer.current,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUser: bindActionCreators(userActions.getUser, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)