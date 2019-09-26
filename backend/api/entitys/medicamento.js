const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const medicamentoSchema = new mongoose.Schema({
    nomeGenerico : {type: String, required : true},
    nomeFabrica : {type: String, required : true},
    fabricante : String
});

module.exports = restfull.model('Medicamento', medicamentoSchema);