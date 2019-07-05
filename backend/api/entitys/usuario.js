const restfull = require('node-restful');
const mongoose = restfull.mongoose;

const validaCpf = function(cpf){

    if((cpf.lenght < 11) 
    || ((cpf === '11111111111')
    || (cpf === '22222222222')
    || (cpf === '33333333333')
    || (cpf === '44444444444')
    || (cpf === '55555555555')
    || (cpf === '66666666666')
    || (cpf === '77777777777')
    || (cpf === '88888888888')
    || (cpf === '99999999999'))){
        return false
    }
    var resto;
    var soma = 0;
    //Valida primeiro dígito verificador
    for(i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    
    resto = (soma * 10) % 11;
    
    if((resto == 10)||(resto == 11))
        resto = 0;
    
    if(resto != parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    //Valida segundo dígito verificador
    for(i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    
    resto = (soma * 10) % 11;
    
    if((resto == 10)||(resto == 11))
        resto = 0;
    
    if(resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
};

const usuarioSchema = new mongoose.Schema({
    nome : {type: String, required : true},
    cpf : {type: String, required : true, unique: true, validate:[validaCpf, 'O CPF informado é inválido!']},
    senha : {type: String, required : true, default: 'abc123'},
    email : {type: String, required : true, unique: true},
    perfil : {type : String, required : true, uppercase : true , 
        enum : ['ADMINISTRADOR', 'PROFISSIONAL', 'AUXILIAR'] }
});

module.exports = restfull.model('Usuario', usuarioSchema);