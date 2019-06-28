const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const usuario = require('./usuario');

const enderecoSchema = new mongoose.Schema({
    tipo : {type: String, required : [true, 'Tipo do endereço não informado']},
    cep : {type: String, required : [true, 'CEP não informado']},
    logradouro : {type: String, required : [true, 'Logradouro não informado']},
    numero : {type : String, required: [true, 'Número não informado']},
    complemento : String,
    bairro : {type: String, required: [true, 'Bairro não informado']},
    municipio : {type: String, required: [true, 'Cidade não informada']},
    uf : {type: String, required : [true, 'UF não informada'], uppercase: true},
    usuarioCad: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : usuario
    },
    usuarioAlt: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : usuario
    }
});

module.exports = restfull.model('Endereco', enderecoSchema);