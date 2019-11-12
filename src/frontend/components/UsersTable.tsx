import * as React from 'react';
import { IUser } from '../types';


const UsersTable = ( data ) => {
	return (
		<table style={{ margin: "auto" }}>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{(data.users.length > 0) ? data.users.map((user, index) => {
					return (
						<tr key={index}>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.email}</td>
						</tr>
					)
				}) : <tr><td colSpan={5}>Loading...</td></tr>}
			</tbody>
		</table>
	);
}

export default UsersTable;