const Profissional = require('../entitys/profissional');
const sendError = require('../../config/sendErrors');

Profissional.methods(['get', 'post', 'put', 'delete']);
Profissional.updateOptions({new : true, runValidators: true});
Profissional.after('post', sendError).after('put', sendError);

module.exports = Profissional;