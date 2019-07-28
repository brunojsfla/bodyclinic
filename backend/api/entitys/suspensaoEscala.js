const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const suspensaoEscalaSchema = new mongoose.Schema({
    profissional : {type: String, required : [true, 'Profissional não informado']},
    dtInicio : {type: Date, required : [true, 'Data de Início não informada']},
    dtTermino : {type: Date, required : [true, 'Data de Término não informada']},
    motivo: {type : String, required : [true, 'Motivo da suspensão não informado'], uppercase : true, 
                    enum : ['FÉRIAS', 'FOLGA', 'LUTO', 
                            'CONGRESSO', 'CONDIÇÃO DE SAÚDE', 'CONDIÇÃO DE TRABALHO', 
                            'DETERMINAÇÃO LEGAL', 'OUTRO'] },
    descricao: String    
});

module.exports = restfull.model('SuspensaoEscala', suspensaoEscalaSchema);