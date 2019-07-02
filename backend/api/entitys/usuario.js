const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const usuarioSchema = new mongoose.Schema({
    nome : {type: String, required : true},
    cpf : {type: String, required : true},
    senha : {type: String, required : true, default: 'abc123'},
    email : {type: String, required : true},
    perfil : {type : String, required : true, uppercase : true , 
        enum : ['ADMINISTRADOR', 'PROFISSIONAL', 'AUXILIAR'] }
});

module.exports = restfull.model('Usuario', usuarioSchema);