const Paciente = require('../entitys/paciente');

Paciente.methods(['get', 'post', 'put', 'delete']);
Paciente.updateOptions({new : true, runValidators: true});

module.exports = Paciente;