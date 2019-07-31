const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const validaCpf = require('../validators/validaCpf');
const validaEmail = require('../validators/validaEmail');
const validaCns = require('../validators/validaCns');

const profissionalSchema = new mongoose.Schema({
    nome : {type: String, required : [true, 'Nome não informado']},
    dtNasc : {type: Date, required : [true, 'Data de Nascimento não informada']},
    sexo : {type: String, required : [true, 'Sexo não informado'], uppercase : true, enum : ['MASCULINO', 'FEMININO']},
    email : {type: String, required : true, trim: true, lowercase: true, validate:[validaEmail, 'O e-mail informado é inválido']},
    telefone : String,
    cnsProfissional: {type: String, validate:[validaCns, 'O CNS informado é inválido!']},
    cpf : {type: String, validate:[validaCpf, 'O CPF informado é inválido!']},
    crm: {type: String, required : [true, 'CRM não informado']},
    ocupacao:{type: String, required:[true, 'Ocupação não informada']}, 
    dtAdmissao: {type : Date, required:[true, 'Data de admissão não informada']},
    dtDemissao: Date,
    dtCad : {type: Date, default: Date.now},
    dtAlt : {type: Date, default: Date.now}
});

module.exports = restfull.model('Profissional', profissionalSchema);