const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const procedimentoSchema = new mongoose.Schema({
    codProc : String,
    nome : String
}, {collection : 'procedimentos'});

module.exports = restfull.model('Procedimento', procedimentoSchema);