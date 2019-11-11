import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { IUser } from "../types";
import UsersTable from '../components/UsersTable';

import * as userActions from '../actions/userActions';

interface IProps {
	getUsers: () => void;
	users: IUser[];
	isLoading: boolean | null;
	error: Error | null;
}

const Users = ({
	getUsers,
	users,
	isLoading,
	error
}: IProps) => {
	React.useEffect(() => {
		getUsers();
	}, []);

	if (error) {
		return <p>{error.message}</p>;
	}
	if (isLoading) {
		return <p>Loading ...</p>;
	}
	return (
		<div className="contianer">
			<div className="table">
				<UsersTable {...users} />
				{/* <p>{JSON.stringify(users, null, 2)} </p> */}
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		users: state.userReducer.users,
		isLoading: state.userReducer.isLoading,
		error: state.userReducer.error
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUsers: bindActionCreators(userActions.getUsers, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Users)