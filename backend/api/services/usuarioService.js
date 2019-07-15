const Usuario = require('../entitys/usuario');
const sendError = require('../../config/sendErrors');

Usuario.methods(['get', 'post', 'put', 'delete']);
Usuario.updateOptions({new : true, runValidators: true});
Usuario.after('post', sendError).after('put', sendError);

module.exports = Usuario;