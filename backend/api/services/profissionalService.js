const Profissional = require('../entitys/profissional');

Profissional.methods(['get', 'post', 'put', 'delete']);
Profissional.updateOptions({new : true, runValidators: true});

module.exports = Profissional;