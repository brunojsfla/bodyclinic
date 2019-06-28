const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const usuario = require('./usuario');
const endereco = require('./endereco');
const ocupacao = require('./ocupacao');

const profissionalSchema = new mongoose.Schema({
    nome : {type: String, required : [true, 'Nome não informado']},
    dtNasc : {type: Date, required : [true, 'Data de Nascimento não informada']},
    sexo : {type: String, required : [true, 'Sexo não informado'], uppercase : true, enum : ['MASCULINO', 'FEMININO']},
    email : String,
    telefone : String,
    cnsProfissional: {type: String, required: [true, 'CNS profissional não informado']},
    dtAdmissao: {type : Date, required:[true, 'Data de admissão não informada']},
    dtDemissao: Date,
    endereco : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : endereco
    },
    documento : {
        tipo : {type: String, required : [true, 'Tipo do documento não informado'], enum : ['CI', 'CPF']},
        numero : {type: String, required : [true, 'Documento não informado']}
    },
    cbo:[{type: mongoose.Schema.Types.ObjectId, ref: ocupacao}],
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

module.exports = restfull.model('Profissional', profissionalSchema);