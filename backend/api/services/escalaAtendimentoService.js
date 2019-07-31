const escalaAtendimento = require('../entitys/escalaAtendimento');
const sendError = require('../../config/sendErrors');

escalaAtendimento.methods(['get', 'post', 'put', 'delete']);
escalaAtendimento.updateOptions({new : true, runValidators: true});
escalaAtendimento.after('post', sendError).after('put', sendError);

module.exports = escalaAtendimento;