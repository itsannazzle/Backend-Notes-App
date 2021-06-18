const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (request, h) => {
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updateAt,
    };

    notes.push(newNote);
    console.log(notes);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Notes added',
            data: {
                noteId: id,
            },
         });
         response.code(201);
         return response;
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Failed to add notes',
        });
        response.code(500);
        return response;
    }
};

const showNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const detailNotesHandler = (request, h) => {
    const {id} = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Notes not found!',
        });
        response.code(404);
        return response;
    }
};

const editNotesHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updateAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Notes updated',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Update notes failed',
        });
        response.code(404);
        return response;
    }
};

const deleteNotesHandler = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Notes deleted',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Delete note failed!',
        });
        response.code(404);
        return response;
    }
};

module.exports = {addNotesHandler, showNotesHandler,
    detailNotesHandler, editNotesHandler, deleteNotesHandler};
