const restfull = require('node-restful');
const mongoose = restfull.mongoose;
const moment = require('moment');

const escalaAtendimentoSchema = new mongoose.Schema({
    dtAtendimento: Date,
    profissional: {type: String, required : [true, 'Profissional não informado']},
    ocupacao: {type: String, required : [true, 'Ocupação não informada']},
    paciente: {type: String, required : [true, 'Paciente não informado']},
    horaInicio: {type: String, required : [true, 'Hora de Início não informada']},
    estado: {type : String, required : [true, 'Estado da Escala de Atendimento não informado'], 
             uppercase : true, default : 'ATIVA', 
             enum : ['ATIVA', 'VENCIDA']}    
});

module.exports = restfull.model('EscalaAtendimento', escalaAtendimentoSchema);