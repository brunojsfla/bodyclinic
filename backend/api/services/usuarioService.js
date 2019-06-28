const Usuario = require('../entitys/usuario');

Usuario.methods(['get', 'post', 'put', 'delete']);
Usuario.updateOptions({new : true, runValidators: true});

module.exports = Usuario;