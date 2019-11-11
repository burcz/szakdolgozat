import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { INote, IUser } from "../types";

import * as noteActions from '../actions/noteActions';
import NotesTable from "../components/NotesTable";

interface IProps {
	getNotesForUser: () => void;
	user: IUser;
	notes: INote[];
	isLoading: boolean | null;
	error: Error | null;

}

const Notes = ({
	getNotesForUser,
	user,
	notes,
	isLoading,
	error
}: IProps) => {
	React.useEffect(() => {
		getNotesForUser();
	}, []);

	if (error) {
		return <p>{error.message}</p>;
	}
	if (isLoading) {
		return <p>Loading ...</p>;
	}
	return (
		<div className="contianer">
			<div className="table">
				<NotesTable {...notes} />
				{/* <p>{JSON.stringify(users, null, 2)} </p> */}
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.noteReducer.user,
		notes: state.noteReducer.notes,
		isLoading: state.noteReducer.isLoading,
		error: state.noteReducer.error
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getNotesForUser: bindActionCreators(noteActions.getNotesForUser, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notes)