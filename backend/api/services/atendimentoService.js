const Atendimento = require('../entitys/atendimento');
const sendError = require('../../config/sendErrors');

Atendimento.methods(['get', 'post', 'put', 'delete']);
Atendimento.updateOptions({new : true, runValidators: true});
Atendimento.after('post', sendError).after('put', sendError);

module.exports = Atendimento;