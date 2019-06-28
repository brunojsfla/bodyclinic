const mongoose = require('mongoose');
const cbo = require('../api/entitys/ocupacao');

module.exports = mongoose.connect('mongodb://localhost:27017/body_clinic', {useNewUrlParser: true})
                            .then(()=>{console.log(`BD conectado com sucesso!`);},
                                 error=>{console.log(`Falha ao conectar ao BD - ${error}`);});                                

//Tratamento de erro
mongoose.Error.messages.general.required = "O atributo '{PATH}' não foi informado";
mongoose.Error.messages.String.enum = "'{VALUE}' é um valor inválido para '{PATH}'";