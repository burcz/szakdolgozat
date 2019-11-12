import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { IUser } from "../types";
import UsersTable from '../components/UsersTable';

import * as userActions from '../actions/userActions';

interface IProps {
	getUsers: () => void;
	all: {
		users: IUser[];
		isLoading: boolean | null;
		error: Error | null;
	}
}

const Users = ({
	getUsers,
	all
}: IProps) => {
	React.useEffect(() => {
		getUsers();
	}, []);

	if (all.error) {
		return <p>{all.error.message}</p>;
	}
	if (all.isLoading) {
		return <p>Loading ...</p>;
	}
	return (
		<div className="contianer">
			<div className="table">
				<UsersTable {...all.users} />
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		all: state.userReducer.all,
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