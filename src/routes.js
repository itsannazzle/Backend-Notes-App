const {addNotesHandler, showNotesHandler,
    detailNotesHandler,
    editNotesHandler,
    deleteNotesHandler} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: showNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: detailNotesHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotesHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesHandler,
    },
];

module.exports = routes;
