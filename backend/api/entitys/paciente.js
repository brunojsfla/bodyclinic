const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const usuario = require('./usuario');
const municipio = require('./municipio');
const validaCpf = require('../validators/validaCpf');
const validaEmail = require('../validators/validaEmail');
const validaCns = require('../validators/validaCns');

const pacienteSchema = new mongoose.Schema({
    nome : {type: String, required : true},
    dtNasc : {type: Date, required : true, max: Date.now},
    sexo : {type: String, required : true, uppercase : true, enum : ['MASCULINO', 'FEMININO']},
    nomePai : String,
    nomeMae : String,
    email : {type: String, required : true, unique: true, trim: true, lowercase: true, validate:[validaEmail, 'O e-mail informado é inválido']},
    telefoneFixo : String,
    telefoneCelular : String,
    endereco : {
        tipo : {type: String, required : [true, 'Tipo do endereço não informado'], uppercase : true,
                enum : ['VILA', 'LARGO', 'TRAVESSA', 'VIELA', 'LOTEAMENTO', 'PÁTIO', 'VIADUTO', 'ÁREA',
                'VIA', 'AEROPORTO', 'VEREDA', 'DISTRITO', 'VALE', 'NÚCLEO', 'TREVO', 'FAZENDA',
                'TRECHO', 'ESTRADA', 'SÍTIO', 'FEIRA', 'SETOR', 'MORRO', 'RUA', 'CHÁCARA', 'RODOVIA',
                'RESIDENCIAL', 'AVENIDA', 'COLÔNIA', 'RECANTO', 'QUADRA', 'PRAÇA', 'CONDOMÍNIO',
                'PASSARELA', 'PARQUE', 'ESPLANADA', 'LAGOA', 'FAVELA', 'LADEIRA', 'LAGO', 'CONJUNTO',
                'JARDIM', 'ESTAÇÃO', 'CAMPO', 'ALAMEDA']},
        cep : {type: String, required : true},
        logradouro : {type: String, required : true},
        numero : {type : String, required: true},
        complemento : String,
        bairro : {type: String, required: true},
        municipio : {nome: {type: String, required: true}, 
                     estado: {type: String , required: true}}
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