import * as React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { logIn } from "../actions/authActions";

interface IProps {
	logIn: (id: string) => void;
}

const LogIn = ({
	logIn
}: IProps) => {
	const [id, setId] = React.useState('');

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		logIn(id);
	};

	return (
		<>
			<p>Login page</p>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="userId">userId</Label>
					<Input type="text" name="user" id="userId" value={id} placeholder="userId" onChange={e => setId(e.target.value)} />
				</FormGroup>

				<Button>Login</Button>
			</Form>
		</>
	);
};

const mapDispatchToProps = {
	logIn: logIn
};

export default connect(
	null,
	mapDispatchToProps,
)(LogIn);