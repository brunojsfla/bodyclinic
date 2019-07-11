const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const usuario = require('./usuario');
const endereco = require('./endereco');
const validaCpf = require('../validators/validaCpf');
const validaEmail = require('../validators/validaEmail');
const validaCns = require('../validators/validaCns');

const pacienteSchema = new mongoose.Schema({
    nome : {type: String, required : [true, 'Nome não informado']},
    dtNasc : {type: Date, required : [true, 'Data de Nascimento não informada'], max: Date.now},
    sexo : {type: String, required : [true, 'Sexo não informado'], uppercase : true, enum : ['MASCULINO', 'FEMININO']},
    nomePai : String,
    nomeMae : String,
    email : {type: String, required : true, unique: true, trim: true, lowercase: true, validate:[validaEmail, 'O e-mail informado é inválido']},
    telefone : String,
    endereco : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : endereco
    },
    cpf : {type: String, unique: true, validate:[validaCpf, 'O CPF informado é inválido!']},
    cns : {type: String, unique: true, validate:[validaCns, 'O CNS informado é inválido!']},
    dtCad : {type: Date, default: Date.now},
    dtAlt : {type: Date, default: Date.now},
    usuarioCad: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : usuario
    },
    usuarioAlt: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : usuario
    }
});

module.exports = restfull.model('Paciente', pacienteSchema);