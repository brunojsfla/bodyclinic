const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const usuario = require('./usuario');
const endereco = require('./endereco');

const pacienteSchema = new mongoose.Schema({
    nome : {type: String, required : [true, 'Nome não informado']},
    dtNasc : {type: Date, required : [true, 'Data de Nascimento não informada']},
    sexo : {type: String, required : [true, 'Sexo não informado'], uppercase : true, enum : ['MASCULINO', 'FEMININO']},
    nomePai : String,
    nomeMae : String,
    email : String,
    telefone : String,
    endereco : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : endereco
    },
    documento : {
        tipo : {type: String, required : [true, 'Tipo do documento não informado'], enum : ['CNS', 'CI', 'CPF']},
        numero : {type: String, required : [true, 'Documento não informado']}
    },
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