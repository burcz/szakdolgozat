import * as React from "react";
import { connect } from "react-redux";
import {getUsers} from '../../actions/userActions';

interface IProps {
	getUsersConnect: () => void;
}

const Main = ({ getUsersConnect }: IProps) => (
	<>
	<p>Users page</p>
		<button onClick={getUsersConnect}>get users</button>
	</>
);

const mapDispatchToProps = {
	getUsersConnect: getUsers
};

export default connect(
	null,
	mapDispatchToProps,
)(Main);