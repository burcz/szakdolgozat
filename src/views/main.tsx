import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { IUser } from '../models/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

import {
	Button,
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

const Navi = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">Notes by burcz</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="/">Home</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/users/">Users</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://github.com/burcz/szakdolgozat">GitHub</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
              </DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									Option 1
                </DropdownItem>
								<DropdownItem>
									Option 2
                </DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									Reset
                </DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}

ReactDOM.render(
	<Navi />,
    document.getElementById("root"),
);

class Users extends Component {
	state : {
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
						<Table users={this.state.users} />
					</div>
				</div>
		);
	}
}

const Table = (users: {users: IUser[]}) => {
	return (
		<table style={{margin: "auto"}}>
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


ReactDOM.render(
	<Users />,
	document.getElementById("users"),
);