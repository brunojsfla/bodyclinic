const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const atendimentoSchema = new mongoose.Schema({
    dtCancelamento: {type: Date, max: Date.now},
    descMotivoCancelamento: String,
    dtAtendimento : {type: Date, required : [true, 'Data de atendimento não informada'], max: Date.now},
    profissional:{type: String, required:[true, 'Profissional não informado']}, 
    paciente:{type: String, required:[true, 'Paciente não informado']}, 
    ocupacao:{type: String, required:[true, 'Ocupação não informada']}, 
    descQueixa : {type: String, required:[true, 'Queixa do paciente não informada']},
    descObjetivo : String,
    temperatura : Number,
    saturacao : Number,
    freqRespiratoria : Number,
    freqCardiaca : Number,
    pressaoSistolica : Number,
    pressaoDistolica : Number,
    peso : Number,
    altura : Number,
    perimetroCefalico : Number,
    examesAvaliados:[{procedimento: String, resultado:{type: String, uppercase: true, enum: ['NORMAL', 'ALTERADO']}, dtResultado: Date}],
    notaExameAvaliado : String,
    descDiagnostico : {type: String, required:[true, 'Diagnóstico não informado']},
    examesSolicitados:[{procedimento: String}],
    notaExameSolicitado: String,
    receituario:[{medicamento: String, instrucoes: String}],
    dtSaida : {type: Date, required : [true, 'Data de saída não informada'], max: Date.now},
    retorno: {type: String, uppercase: true, enum: ['SIM', 'NÃO'], default: 'NÃO'},
    estado: {type: String, uppercase: true, enum: ['AGENDADO', 'CONCLUÍDO', 'CANCELADO']},
    dtRetorno : Date,
    dtAlt : {type: Date, default: Date.now},
});

module.exports = restfull.model('Atendimento', atendimentoSchema);