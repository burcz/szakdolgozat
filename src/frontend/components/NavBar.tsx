import * as React from "react";
import {
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

class NavBar extends React.Component {
	state: {
		isOpen: boolean;
	}
	constructor(props: any) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	toggle() {
		let setIsOpen;
		[this.state.isOpen, setIsOpen] = React.useState(false);
		return setIsOpen(this.state.isOpen);
	}

	render() {
		const toggle = () => this.toggle();

		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Notes by burcz</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
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
}

export default NavBar;
