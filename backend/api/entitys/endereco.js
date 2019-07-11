const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const municipio = require('./municipio');

const enderecoSchema = new mongoose.Schema({
    tipo : {type: String, required : [true, 'Tipo do endereço não informado'], uppercase : true,
            enum : ['VILA', 'LARGO', 'TRAVESSA', 'VIELA', 'LOTEAMENTO', 'PÁTIO', 'VIADUTO', 'ÁREA',
                    'VIA', 'AEROPORTO', 'VEREDA', 'DISTRITO', 'VALE', 'NÚCLEO', 'TREVO', 'FAZENDA',
                    'TRECHO', 'ESTRADA', 'SÍTIO', 'FEIRA', 'SETOR', 'MORRO', 'RUA', 'CHÁCARA', 'RODOVIA',
                    'RESIDENCIAL', 'AVENIDA', 'COLÔNIA', 'RECANTO', 'QUADRA', 'PRAÇA', 'CONDOMÍNIO',
                    'PASSARELA', 'PARQUE', 'ESPLANADA', 'LAGOA', 'FAVELA', 'LADEIRA', 'LAGO', 'CONJUNTO',
                    'JARDIM', 'ESTAÇÃO', 'CAMPO', 'ALAMEDA']},
    cep : {type: String, required : [true, 'CEP não informado']},
    logradouro : {type: String, required : [true, 'Logradouro não informado']},
    numero : {type : String, required: [true, 'Número não informado']},
    complemento : String,
    bairro : {type: String, required: [true, 'Bairro não informado']},
    municipio : {type: mongoose.Schema.Types.ObjectId, ref: municipio, required: true},
});

module.exports = restfull.model('Endereco', enderecoSchema);