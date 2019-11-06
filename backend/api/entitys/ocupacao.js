const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const ocupacaoSchema = new mongoose.Schema({
    cbo: String,
    nome: String
}, { collection: 'ocupacao' });

module.exports = restfull.model('Ocupacao', ocupacaoSchema);