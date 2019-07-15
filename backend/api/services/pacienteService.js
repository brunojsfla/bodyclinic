const Paciente = require('../entitys/paciente');
const sendError = require('../../config/sendErrors');

Paciente.methods(['get', 'post', 'put', 'delete']);
Paciente.updateOptions({new : true, runValidators: true});
Paciente.after('post', sendError).after('put', sendError);

module.exports = Paciente;