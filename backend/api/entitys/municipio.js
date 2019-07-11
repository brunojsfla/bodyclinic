const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const municipioSchema = new mongoose.Schema({
    nome : {type: String, required : true},
    uf : {type: String, required : true},
    siglaUf : {type: String, required : true},
});

module.exports = restfull.model('Municipio', municipioSchema);