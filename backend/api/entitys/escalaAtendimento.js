const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const escalaAtendimentoSchema = new mongoose.Schema({
    profissional: {type: String, required : [true, 'Profissional não informado']},
    ocupacao: {type: String, required : [true, 'Ocupação não informada']},
    diaSemana: {type : String, required : [true, 'Dia da semana não informado'], 
                uppercase : true,
                enum : ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA',
                        'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO']}, 
    dtInicio: {type: Date, required : [true, 'Data de Início não informada']},
    dtTermino: Date,
    horaInicio: {type: String, required : [true, 'Hora de Início não informada']},
    horaTermino: {type: String, required : [true, 'Hora de Término não informada']},
    qtdAtendimentos: Number,
    estado: {type : String, required : [true, 'Estado da Escala de Atendimento não informado'], 
             uppercase : true, default : 'PROGRAMADA', 
             enum : ['PROGRAMADA', 'ATIVA', 'VENCIDA']}    
});

module.exports = restfull.model('EscalaAtendimento', escalaAtendimentoSchema);