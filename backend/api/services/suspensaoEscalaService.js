const suspensaoEscala = require('../entitys/suspensaoEscala');
const sendError = require('../../config/sendErrors');

suspensaoEscala.methods(['get', 'post', 'put', 'delete']);
suspensaoEscala.updateOptions({new : true, runValidators: true});
suspensaoEscala.after('post', sendError).after('put', sendError);

module.exports = suspensaoEscala;