const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const moment = require('moment');

const atendimentoSchema = new mongoose.Schema({
    dtAtendimento : {type: Date, required : true, default: moment().format('L'), max: Date.now},
    profissional:{type: String, required:[true, 'Profissional não informado']}, 
    paciente:{type: String, required:[true, 'Paciente não informado']}, 
    ocupacao:{type: String, required:[true, 'Ocupação não informada']}, 
    descQueixa : String,
    descObjetivo : String,
    temperatura : mongoose.Decimal128,
    saturacao : mongoose.Decimal128,
    freqRespiratoria : mongoose.Decimal128,
    freqCardiaca : mongoose.Decimal128,
    pressaoSistolica : mongoose.Decimal128,
    pressaoDistolica : mongoose.Decimal128,
    peso : mongoose.Decimal128,
    altura : mongoose.Decimal128,
    perimetroCefalico : mongoose.Decimal128,
    examesAvaliados:[{procedimento: String, resultado:{type: String, uppercase: true, enum: ['NORMAL', 'ALTERADO']}, dtResultado: Date}],
    notaExameAvaliado : String,
    descDiagnostico : String,
    examesSolicitados:[{procedimento: String}],
    notaExameSolicitado: String,
    receituario:[{medicamento: String, instrucoes: String}],
    dtSaida : {type: Date, required : true, default: moment().format('L'), max: Date.now},
    retorno: {type: String, uppercase: true, enum: ['SIM', 'NÃO'], default: 'NÃO'},
    estado: {type: String, uppercase: true, enum: ['CONCLUÍDO', 'CANCELADO']},
    dtRetorno : {type: Date, default: Date.now},
    dtAlt : {type: Date, default: Date.now},
});

module.exports = restfull.model('Atendimento', atendimentoSchema);