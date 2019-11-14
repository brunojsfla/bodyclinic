const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost:27017/body_clinic';

module.exports = mongoose.connect(url, {useNewUrlParser: true})
                            .then(()=>{console.log(`BD conectado com sucesso!`);},
                                 error=>{console.log(`Falha ao conectar ao BD - ${error}`);});
                                                         

//Tratamento de erro
mongoose.Error.messages.general.required = "O atributo '{PATH}' não foi informado";
mongoose.Error.messages.String.enum = "'{VALUE}' é um valor inválido para '{PATH}'";