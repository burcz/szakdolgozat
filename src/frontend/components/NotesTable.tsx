import * as React from 'react';

const NotesTable = ( data ) => {
	return (
		<table style={{ margin: "auto" }}>
			<thead>
				<tr>
					<th>User</th>
					<th>Body</th>
				</tr>
			</thead>
			<tbody>
				{(data.notes.length > 0) ? data.notes.map((note, index) => {
					return (
						<tr key={index}>
							<td>{note.user}</td>
							<td>{note.body}</td>
						</tr>
					)
				}) : <tr><td colSpan={5}>Loading...</td></tr>}
			</tbody>
		</table>
	);
}

export default NotesTable;