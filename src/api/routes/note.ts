import { TRoutesInput } from '../types/routes';
import { noteController } from '../controllers';

export default ({ app }: TRoutesInput) => {
	// Create note
	app.post('/api/note', async (req, res, next) => {
		try {
			const note = await noteController.createNote({
				userId: req.body.userId,
				body: req.body.body
			});

			return res.send({ note });
		}
		catch (err) {
			return next(err);
		}
	});

	// Get note
	app.get('/api/note/:noteId', async (req, res) => {
		const note = await noteController.getNote(req.params.noteId);
		return res.send({ note });
	});

	// Update note
	app.put('/api/note/:noteId', async (req, res) => {
		const updatedNote = await noteController.updateNote(req.params.noteId, req.body);
		return res.send({ updatedNote });
	});

	// Delete note
	app.delete('/api/note/:noteId', async (req, res) => {
		const deletedNote = await noteController.deleteNote(req.params.noteId);
		return res.send({ deletedNote });
	});

	// Get all notes
	app.get('/api/notes', async (req, res) => {
		const notes = await noteController.getAllNotes();
		return res.send({ notes });
	});
};