const _ = require('lodash');
const jwt = require('jsonwebtoken');
const usuario = require('../entitys/usuario');

const sendErrorsFromDB = (res, dbErrors) =>{
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));

    return res.status(400).json({errors});
};

const login = (req, res, next) => {
    console.log('Entrou...');
    const email = req.body.email || '';
    const senha = req.body.senha || '';
  
    usuario.findOne({email}, (err, user) => {
        if(err){
            return sendErrorsFromDB(res, err);
        }else 
            if(user){
                if(user.senha === senha){
                    const token = 'body@clinic@';
                    
                    const { nome, email, perfil, cpf } = user;
                    res.json({ nome, email, perfil, cpf, token });
                }else{
                    return res.status(400).send({errors: ['Usuário ou senha invalidos!']});
                }
            }else{
                return res.status(400).send({errors: ['Usuário ou senha invalidos!']});
            }
            
    });
 };

 const validateToken = (req, res, next) => {
    const token = req.body.token || '';
    jwt.verify(token, 'body@clinic@', function(err, decoded) {
        return res.status(200).send({valid: !err});
    });
};

module.exports = { login, validateToken };