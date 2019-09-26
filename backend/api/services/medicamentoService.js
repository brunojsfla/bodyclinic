const Medicamento = require('../entitys/medicamento');
const sendError = require('../../config/sendErrors');

Medicamento.methods(['get', 'post', 'put', 'delete']);
Medicamento.updateOptions({new : true, runValidators: true});
Medicamento.after('post', sendError).after('put', sendError);

module.exports = Medicamento;