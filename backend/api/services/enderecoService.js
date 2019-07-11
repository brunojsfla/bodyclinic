const Endereco = require('../entitys/endereco');

Endereco.methods(['get', 'post', 'put']);
Endereco.updateOptions({new : true, runValidators: true});

module.exports = Endereco;