import {
	GET_USER_NOTES_ACTION,
	IGeUserNotesAction
} from '../actions/noteActions';

import { INotesState } from '../types';

const initialState = {
	notes: [],
	isLoading: true,
	error: null
};

export default function userReducer(
	state: INotesState = initialState,
	action: IGeUserNotesAction,
): INotesState {
	switch (action.type) {
		case GET_USER_NOTES_ACTION:
			state = action.data;
	}
	return state;
}