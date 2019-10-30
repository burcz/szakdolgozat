import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { IUser } from "../../types";

import * as userActions from '../../actions/userActions';

interface IProps {
	getUsers: () => void;
	users: IUser[];
	isLoading: boolean | null;
	error: Error | null;
}

const Main = ({
	getUsers,
	users,
	isLoading,
	error
}: IProps) => {
	React.useEffect(() => {
		getUsers();
	}, []);


	// componentDidMount() {
	// 	this.setState({ isLoading: true });
	// 	fetch('http://localhost:8080/api/users')
	// 		.then(response => {
	// 			if (response.ok) {
	// 				return response.json();
	// 			} else {
	// 				throw new Error('Something went wrong ...');
	// 			}
	// 		})
	// 		.then(data => this.setState({ users: data.users, isLoading: false }))
	// 		.catch(error => this.setState({ error, isLoading: false }));
	// }

	if (error) {
		return <p>{error.message}</p>;
	}
	if (isLoading) {
		return <p>Loading ...</p>;
	}
	return (
		<div className="contianer">
			<div className="table">
				{/* <Table users={users} /> */}
				<p>{users} </p>
			</div>
		</div>
	);
	
}

// const Main = ({ getUsersConnect }: IProps) => (
// 	// const users = getUsers();
// 	<>
// 	<p>Users page</p>
// 		<button onClick={getUsersConnect}>get users</button>
// 	</>
// );


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
)(Main)