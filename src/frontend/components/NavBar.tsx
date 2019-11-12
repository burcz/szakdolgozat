import * as React from "react";
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
} from 'reactstrap';
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { IReducedStates } from "../types";

interface IProps {
	isAuthenticated: boolean | null;
	uuid: string | null;
}

const NavBar = ({ isAuthenticated, uuid }: IProps) => {
	const logInOut = isAuthenticated ? (
		<NavItem>
			<NavLink to="/log-out">
				Log out
			</NavLink>
		</NavItem>
	) : (
		<NavItem>
			<NavLink to="/log-in">
				Log in
			</NavLink>
		</NavItem>
	);
	const mainLinks = isAuthenticated ? (
		<>
			<NavItem>
				<NavLink to="/home">
					Home
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink to="/users">
					Users
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink to="/notes">
					Notes
				</NavLink>
			</NavItem>
		</>
	) : (
		<>
			<NavItem>
				<NavLink to="/">
					Landing
				</NavLink>
			</NavItem>
		</>
	);

	return (
		<Navbar color="light" light expand="md">
			<NavbarBrand href="/">Notes by burcz Auth state: {isAuthenticated ? `Logged in user: ${uuid}` : "Logged out"}</NavbarBrand>
			<Nav className="ml-auto" navbar>
				{mainLinks}
				{logInOut}
			</Nav>
		</Navbar>
	);

}

const mapStateToProps = (state: IReducedStates) => ({
	uuid: state.authReducer.uuid,
	isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(
	mapStateToProps,
)(NavBar);
