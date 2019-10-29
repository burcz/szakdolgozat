import * as React from 'react';

interface IUser {
	firstName: string;
	lastName: string;
	email: string;
}

class UsersTable extends React.Component {
	state: {
		users: IUser[];
		isLoading: boolean;
		error: Error | null;
	};

	constructor(props: any) {
		super(props);
		this.state = {
			users: [],
			isLoading: false,
			error: null,
		};
	}

	componentDidMount() {
		this.setState({ isLoading: true });
		fetch('http://localhost:8080/api/users')
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something went wrong ...');
				}
			})
			.then(data => this.setState({ users: data.users, isLoading: false }))
			.catch(error => this.setState({ error, isLoading: false }));
	}

	render() {
		const { users, isLoading, error } = this.state;
		if (error) {
			return <p>{error.message}</p>;
		}
		if (isLoading) {
			return <p>Loading ...</p>;
		}
		return (
			<div className="contianer">
				<div className="table">
					<Table users={users} />
				</div>
			</div>
		);
	}
}

const Table = (users: { users: IUser[] }) => {
	return (
		<table style={{ margin: "auto" }}>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{(users.users.length > 0) ? users.users.map((user, index) => {
					return (
						<tr key={index}>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.email}</td>
						</tr>
					)
				}) : <tr><td colSpan={5}>Loading...</td></tr>}
			</tbody>
		</table>
	);
}

export default UsersTable;