import React, { Component } from 'react';
import * as axios from '../../../node_modules/axios/index';

import {
	Button,
	Col,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	FormText,
	Input,
	Label
} from 'reactstrap';
import { any } from 'prop-types';

class RegisterForm extends Component {
	state: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
		validate: {
			emailState: 'has-success' | 'has-danger';
		};
		result: string;
	};
	constructor(props: any) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			validate: {
				emailState: 'has-danger',
			},
			result: 'failed'
		}
		this.handleChange = this.handleChange.bind(this);
	}

	validateEmail(e: any) {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const { validate } = this.state
		if (emailRex.test(e.target.value)) {
			validate.emailState = 'has-success'
		} else {
			validate.emailState = 'has-danger'
		}
		this.setState({ validate })
	}

	handleChange(event: any) {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;
		this.setState({
			[name]: value,
		});
	}

	onFormSubmit(data: React.SyntheticEvent) {
		const apiUrl = 'http://localhost8080/api/user';

		const user = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email
		}

		// axios.default.post(apiUrl, user)
		// 	.then((res: any) => console.log(res.data));

		// fetch(apiUrl, options)
		// 	.then(res => res.json())
		// 	.then(result => {
		// 		console.log(result);
		// 		this.setState({ result:'success'});
		// 		// this.setState({
		// 		// 	response: result,
		// 		// 	isAddProduct: false
		// 		// })
		// 	},
		// 		(error) => {
		// 			this.setState({ error });
		// 		}
		// )
	}

	render() {
		if (this.state.result === 'success') {
			return (<span>boller</span>)
		}
		const { email, password } = this.state;
		return (
			<Container className="App">
				<h2>Sign In</h2>
				<Form className="form" onSubmit={(e) => this.onFormSubmit(e)}>
					<Col>
						<FormGroup>
							<Label>Firstname</Label>
							<Input
								type="text"
								name="firstName"
								placeholder="Firstname"
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label>Lastname</Label>
							<Input
								type="text"
								name="lastName"
								placeholder="Lastname"
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label>Username</Label>
							<Input
								type="email"
								name="email"
								id="exampleEmail"
								placeholder="myemail@email.com"
								value={email}
								valid={this.state.validate.emailState === 'has-success'}
								invalid={this.state.validate.emailState === 'has-danger'}
								onChange={(e) => {
									this.validateEmail(e)
									this.handleChange(e)
								}}
							/>
							<FormFeedback valid>
								That's a tasty looking email you've got there.
              </FormFeedback>
							<FormFeedback>
								Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
							<FormText>Your username is most likely your email.</FormText>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="examplePassword">Password</Label>
							<Input
								type="password"
								name="password"
								id="examplePassword"
								placeholder="********"
								value={password}
								onChange={(e) => this.handleChange(e)}
							/>
						</FormGroup>
					</Col>
					<Button>Submit</Button>
				</Form>
			</Container>
		);
	}
}
export default RegisterForm;