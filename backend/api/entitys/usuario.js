const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const validaCpf = require('../validators/validaCpf');
const validaEmail = require('../validators/validaEmail');

const usuarioSchema = new mongoose.Schema({
    nome : {type: String, required : true},
    cpf : {type: String, required : true, unique: true, validate:[validaCpf, 'O CPF informado é inválido!']},
    senha : {type: String, required : true, default: 'abc123', min: 6, max: 12},
    email : {type: String, required : true, unique: true, trim: true, lowercase: true, validate:[validaEmail, 'O e-mail informado é inválido']},
    perfil : {type : String, required : true, uppercase : true, 
        enum : ['ADMINISTRADOR', 'PROFISSIONAL', 'AUXILIAR'] }
});

module.exports = restfull.model('Usuario', usuarioSchema);