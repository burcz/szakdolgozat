import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { INote, IUser } from "../types";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import * as noteActions from '../actions/noteActions';
import NotesTable from "../components/NotesTable";

interface IProps {
	getNotesForUser: (userId: string) => void;
	createNote: (userId: string, noteBody: string) => void;
	notes: INote[];
	isLoading: boolean | null;
	error: Error | null;

}

const Notes = ({
	getNotesForUser,
	createNote,
	notes,
	isLoading,
	error
}: IProps) => {
	const userId = window.localStorage.getItem('userId') || '';
	const [refreshNotes, setRefreshNotes] = React.useState(true);
	const [noteBody, setNoteBody] = React.useState('');
	React.useEffect(() => {
		getNotesForUser(userId);
	}, [refreshNotes]);

	const handleSubmit = (event: React.SyntheticEvent) => {
		createNote(userId, noteBody);
		setTimeout(() => {setRefreshNotes(!refreshNotes)}, 1000);
		setNoteBody('');
		event.preventDefault();
	};

	if (error) {
		return <p>{error.message}</p>;
	}
	if (isLoading) {
		return <p>Loading ...</p>;
	}
	return (
		<>
		<div className="contianer">
			<div className="table">
				<NotesTable {...notes} />
				{/* <p>{JSON.stringify(users, null, 2)} </p> */}
			</div>
		</div>
			<p>Create new note</p>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="noteBody">note</Label>
					<Input type="text" name="note" id="noteBody" value={noteBody} placeholder="note" onChange={e => setNoteBody(e.target.value)} />
				</FormGroup>

				<Button>Create</Button>
			</Form>
		</>
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
		getNotesForUser: bindActionCreators(noteActions.getNotesForUser, dispatch),
		createNote: bindActionCreators(noteActions.createNote, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notes)
