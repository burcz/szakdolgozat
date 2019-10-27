import React, { Component, useState } from "react";
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	state = {
		users: {}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(props: any) {
		super(props);
	}

	render() {
		const { users } = this.state;
		return (
			<div>
				<span>kajak</span>
			</div>
		)
	}

	componentDidMount() {
		this.setState({users: this.getDataFromDb()});
	}

	getDataFromDb = () => {
		fetch('http://localhost:8080/api/users')
			.then((data) => data.json())
			.then((res) => this.setState({ users: res.data }));
	};
}


ReactDOM.render(
	<App/>,
	document.getElementById("root"),
);
