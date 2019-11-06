const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const estadoSchema = new mongoose.Schema({
    nome : {type: String, required : true},
    siglaUf : {type: String, required : true},
}, {collection : 'estado'});

module.exports = restfull.model('Estado', estadoSchema);