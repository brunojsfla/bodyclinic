const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const procedimentoSchema = new mongoose.Schema({
    codProc : String,
    nome : String,
    idadeMin : Number,
    idadeMax : Number,
}, {collection : 'procedimentos'});

module.exports = restfull.model('Procedimento', procedimentoSchema);